/*
 * @Author: gengxing 
 * @Date: 2020-06-09 11:50:50 
 * @Last Modified by:   gengxing 
 * @Last Modified time: 2020-06-09 11:50:50 
 * sps解析器
 */
import ExpGolomb from './exp-golomb';

const AspectRatio = [
    [1, 1], [12, 11], [10, 11], [16, 11], [40, 33], [24, 11], [20, 11], [32, 11], [80, 33], [18, 11], [15, 11], [64, 33], [160, 99], [4, 3], [3, 2], [2, 1]
];

const ChromaFormat: Record<number, string> = {
    1: '4:2:0',
    2: '4:2:2',
    3: '4:4:4'
}

const Profile: Record<number, string> = {
    66: 'Baseline',
    77: 'Main',
    88: 'Extended',
    100: 'High',
    110: 'High10',
    122: 'High422',
    244: 'High444',
}

const ProfileIDCList = [100, 110, 122, 244, 44, 83, 86, 118, 128, 138, 144];

/**
 * 输出sps信息结构
 */
type SPSInfo = {
    profile: string;
    level: string;
    chromaFormat: string;
    fps: number;
    pixelAspectRatio: number[];
    width: number;
    height: number;
};

class SPSParser {
    /**
     * 解析sps数据
     * @param value sps数据
     */
    public static parse(value: Uint8Array): SPSInfo {
        let spsData = new Uint8Array(value.byteLength);
        // 脱壳
        let index = 0;
        for (let i = 0; i < value.byteLength; i++) {
            if (i >= 2 && value[i] === 3 && value[i - 1] === 0 && value[i - 2] === 0) {
                continue;
            }
            spsData[index] = value[i];
            index++;
        }

        let data: ExpGolomb | undefined = new ExpGolomb(spsData);
        data.skipBits(8);
        const profileIDC = data.bits(8); // profile_idc
        data.skipBits(8); // constraint_set_flags 4 reserved_zero 4
        const levelIDC = data.bits(8); // level_idc
        data.ue(); // seq_parameter_set_id
        let chromaFormatIDC = 1;

        if (ProfileIDCList.indexOf(profileIDC) !== -1) {
            chromaFormatIDC = data.ue(); // chrome_format_idc
            if (chromaFormatIDC === 3) {
                data.skipBits(1); // residual_colour_transform_flag
            }

            data.ue(); // bit_depth_luma_minus8
            data.ue(); // bit_depth_chroma_minus8
            data.skipBits(1); // qpprime_y_zero_transform_bypass_flag
            if (data.bits(1)) { // seq_scaling_matrix_present_flag
                const scalingListCount = chromaFormatIDC !== 3 ? 8 : 12;
                for (let i = 0; i < scalingListCount; i++) {
                    if (data.bits(1)) { // seq_scaling_list_present_flag
                        if (i < 6) {
                            SPSParser._skipScalingList(data, 16);
                        } else {
                            SPSParser._skipScalingList(data, 64);
                        }
                    }
                }
            }
        }
        data.ue(); // log2_max_frame_num_minus4
        const picOrderCntType = data.ue(); // pic_order_cnt_type
        if (picOrderCntType === 0) {
            data.ue(); // log2_max_pic_order_cnt_lsb_minus_4
        } else if (picOrderCntType === 1) {
            data.bits(1); // delta_pic_order_always_zero_flag
            data.se(); // offset_for_non_ref_pic
            data.se(); // offset_for_top_to_bottom_field
            const num = data.ue(); // num_ref_frames_in_pic_order_cnt_cycle
            for (let i = 0; i < num; i++) {
                data.se(); // offset_for_ref_frame
            }
        }
        data.ue(); // num_ref_frames
        data.skipBits(1); // gaps_in_frame_num_value_allowed_flag

        const picWidthInMbsMinus1 = data.ue(); // pic_width_in_mbs_minus1
        const picHeightInMapUnitsMinus1 = data.ue(); // pic_height_in_map_units_minus1

        const frameMbsOnlyFlag = data.bits(1); // frame_mbs_only_flag
        if (frameMbsOnlyFlag === 0) {
            data.skipBits(1); // mb_adaptive_frame_field_flag
        }
        data.skipBits(1); // direct_8x8_inference_flag

        let frameCropLeftOffset = 0;
        let frameCropRightOffset = 0;
        let frameCropTopOffset = 0;
        let frameCropBottomOffset = 0;

        if (data.bits(1)) { // frame_cropping_flag
            frameCropLeftOffset = data.ue(); // frame_crop_left_offset
            frameCropRightOffset = data.ue(); // frame_crop_right_offset
            frameCropTopOffset = data.ue(); // frame_crop_top_offset
            frameCropBottomOffset = data.ue(); // frame_crop_bottom_offset
        }

        let fps = 0,
            pixelAspectRatio = [1, 1];

        if (data.bits(1)) { // vui_parameters_present_flag
            if (data.bits(1)) { // aspect_ratio_info_present_flag
                const aspectRatioIDC = data.bits(8); // aspect_ratio_idc
                if (aspectRatioIDC > 0 && aspectRatioIDC < 16) {
                    pixelAspectRatio = AspectRatio[aspectRatioIDC - 1];
                } else if (aspectRatioIDC === 255) {
                    pixelAspectRatio = [(data.bits(8) << 8) | data.bits(8), (data.bits(8) << 8) | data.bits(8)];
                }
            }

            if (data.bits(1)) { // overscan_info_present_flag
                data.bits(1); // overscan_appropriate_flag
            }
            if (data.bits(1)) { // video_signal_type_present_flag
                data.bits(4); // video_format 3 video_full_range_flag 1
                if (data.bits(1)) { // colour_description_present_flag
                    data.bits(24); // colour_primaries 8 transfer_characteristics 8 matrix_coefficients 8
                }
            }
            if (data.bits(1)) { // chroma_loc_info_present_flag
                data.ue(); // chroma_sample_loc_type_top_field
                data.ue(); // chroma_sample_loc_type_bottom_field
            }
            if (data.bits(1)) { // timing_info_present_flag
                const numUnitsInTick = data.bits(32); // num_units_in_tick
                const timeScale = data.bits(32); // time_scale
                if (!!data.bits(1)) { // fixed_frame_rate_flag
                    fps = timeScale / (numUnitsInTick * 2);
                }
            }
        }

        data = undefined;

        let cropUnitX = 0,
            cropUnitY = 0;
        if (chromaFormatIDC === 0) {
            cropUnitX = 1;
            cropUnitY = 2 - frameMbsOnlyFlag;
        } else {
            const subWc = chromaFormatIDC === 3 ? 1 : 2;
            const subHc = chromaFormatIDC === 1 ? 2 : 1;
            cropUnitX = subWc;
            cropUnitY = subHc * (2 - frameMbsOnlyFlag);
        }

        let width = (picWidthInMbsMinus1 + 1) * 16;
        let height = (2 - frameMbsOnlyFlag) * ((picHeightInMapUnitsMinus1 + 1) * 16);

        width -= (frameCropLeftOffset + frameCropRightOffset) * cropUnitX;
        height -= (frameCropTopOffset + frameCropBottomOffset) * cropUnitY;

        return {
            profile: Profile[profileIDC] || 'unknown',
            level: (levelIDC / 10).toFixed(1),
            chromaFormat: (chromaFormatIDC <= 3 ? ChromaFormat[chromaFormatIDC] : ChromaFormat[1]) || 'unknown',
            fps,
            pixelAspectRatio,
            width: width,
            height: height,
        };
    }

    /**
     * 忽略scaling_list数据
     * @param data 数据
     * @param count 长度
     */
    private static _skipScalingList(data: ExpGolomb, count: number): void {
        let lastScale = 8,
            nextScale = 8;
        let deltaScale = 0;
        for (let i = 0; i < count; i++) {
            if (nextScale !== 0) {
                deltaScale = data.se();
                nextScale = (lastScale + deltaScale + 256) % 256;
            }
            lastScale = nextScale === 0 ? lastScale : nextScale;
        }
    }
}

export default SPSParser;

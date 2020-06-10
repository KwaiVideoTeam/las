import BufferedBar from "./modules/buffered-bar";
import ProgressBar from "./modules/progress-bar";

class LasTools {
    static get ProgressBarClass() {
        return ProgressBar;
    }
    static get BufferedBarClass() {
        return BufferedBar;
    }
}

export default LasTools;
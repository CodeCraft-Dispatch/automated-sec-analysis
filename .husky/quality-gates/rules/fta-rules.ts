import { FtaRunner } from "../../../eng/lib/fta/fta-runner";
import { config } from "./fta-config";

(new FtaRunner().run(config));

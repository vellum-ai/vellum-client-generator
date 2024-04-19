import path from "path";
import fs from "fs";
import {
  ConstructsMaker,
  TerraformProviderConstraint,
} from "@cdktf/provider-generator";
import { Language } from "@cdktf/commons";

const workdir = process.cwd();

const constraint = new TerraformProviderConstraint("vellum-ai/vellum");
const SDKS = [
  {
    targetLanguage: Language.TYPESCRIPT,
    repo: "vellum-client-node",
    folder: "src",
    postProcessFrom: ["providers", "vellum"],
  },
  {
    targetLanguage: Language.PYTHON,
    repo: "vellum-client-python",
    folder: "src/vellum",
    postProcessFrom: ["vellum"],
  },
];

SDKS.forEach(async ({ repo, targetLanguage, folder, postProcessFrom }) => {
  const repoRoot = path.join(workdir, "..", repo);
  if (!fs.existsSync(repoRoot)) {
    console.warn(`Repo not found: ${repoRoot}. Skipping...`);
  }

  const codeMakerOutput = path.join(repoRoot, folder, "terraform");
  if (fs.existsSync(codeMakerOutput)) {
    fs.rmSync(codeMakerOutput, { recursive: true });
  }

  const constructsMaker = new ConstructsMaker({
    codeMakerOutput,
    targetLanguage,
  });
  await constructsMaker.generate([constraint]);

  // cdktf by default generates into some random directory that we want to unnest.
  const postProcessFromPath = path.join(codeMakerOutput, ...postProcessFrom);

  // move all files from postProcessFromPath to codeMakerOutput
  fs.readdirSync(postProcessFromPath).forEach((file) => {
    fs.renameSync(
      path.join(postProcessFromPath, file),
      path.join(codeMakerOutput, file)
    );
  });
  fs.rmdirSync(path.join(codeMakerOutput, postProcessFrom[0]), {
    recursive: true,
  });
});

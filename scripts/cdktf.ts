import path from "path";
import fs from "fs";
import {
  ConstructsMaker,
  TerraformProviderConstraint,
} from "@cdktf/provider-generator";
import { Language } from "@cdktf/commons";

const workdir = process.cwd();

const checkVersions = () =>
  fetch("https://registry.terraform.io/v1/providers/vellum-ai/vellum/versions")
    .then((r) => r.json())
    .then((r) => {
      const res = r as { versions: { version: string }[] };
      const vs = res.versions.slice(0, 5);
      console.log(
        "Latest Versions: ",
        vs.map((v) => v.version)
      );
    });

const args = process.argv.slice(2);
const resolutionItem =
  args[0] == "--local" ? "../terraform-provider-local" : "vellum-ai/vellum";
const constraint = new TerraformProviderConstraint(resolutionItem);

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

// checkVersions();

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

module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/bytedance/LatentSync app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          // Install ffmpeg, THIS IS REQUIRED.
          "conda install -y -c conda-forge ffmpeg",
          "conda install -y fastai::opencv-python-headless",
          "pip install -r requirements.txt",
          "pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.2.0-windows.post9/triton-3.2.0-cp310-cp310-win_amd64.whl",
          // Download all the checkpoints from HuggingFace
          'huggingface-cli download ByteDance/LatentSync --local-dir checkpoints --exclude "*.git*" "README.md"'
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}

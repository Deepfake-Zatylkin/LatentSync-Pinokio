module.exports = async (kernel) => {
  return {
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
    {
      method: "shell.run",
      params: {
        message: [
          // Comment out the first 5 lines from the "requirements.txt" file located in the project app folder
          "node edit_requirements_file.js",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          // Install ffmpeg
          "conda install -y -c conda-forge ffmpeg",
          // Install Python dependencies
          "uv pip install -r requirements.txt",
          //"pip install -r requirements.txt",
          // Download all the checkpoints from HuggingFace
          'huggingface-cli download ByteDance/LatentSync --local-dir checkpoints --exclude "*.git*" "README.md"'
        ]
      }
    },
    // Edit this step with your custom install commands
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          // Install OpenCV Dependencies
          "conda install -y fastai::opencv-python-headless",
          // Install Triton
          "uv pip install https://github.com/woct0rdho/triton-windows/releases/download/v3.1.0-windows.post8/triton-3.1.0-cp310-cp310-win_amd64.whl",
        ]
      }
    },
    {
      when: "{{platform === 'linux'}}",
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          // Install Triton
          "uv pip install triton==2.2.0",
          // OpenCV dependencies
          "sudo apt -y install libgl1",
          // Soft links for the auxiliary models
          "mkdir -p ~/.cache/torch/hub/checkpoints",
          "ln -s $(pwd)/checkpoints/auxiliary/2DFAN4-cd938726ad.zip ~/.cache/torch/hub/checkpoints/2DFAN4-cd938726ad.zip",
          "ln -s $(pwd)/checkpoints/auxiliary/s3fd-619a316812.pth ~/.cache/torch/hub/checkpoints/s3fd-619a316812.pth",
          "ln -s $(pwd)/checkpoints/auxiliary/vgg16-397923af.pth ~/.cache/torch/hub/checkpoints/vgg16-397923af.pth",
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
}
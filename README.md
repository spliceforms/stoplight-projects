# stoplight-style-guide

## Spectral Custom Ruleset

This repository provides a custom Spectral ruleset for validating and linting OpenAPI specifications or other YAML/JSON files directly in Visual Studio Code using the Spectral extension.

## Table of Contents

- [About](#about)
- [Using Stoplight-CLI](#using-stoplight-cli)
- [Configure in VS Code](#configure-in-vs-code)

---

## About

The custom `.spectral.json` ruleset enforces specific style and validation rules to maintain high-quality API definitions.

---

## Using Stoplight-CLI

 ### Prerequisites
 
 	 node -v
 	 npm -v

 ### Validate using StopLight CLI
 Step 1 : Install Spectral CLI

	 npm install -g @stoplight/spectral-cli

Step 2: Verify Spectral Installation

	 spectral --version

Step 3: Create/Download an OpenAPI YAML/JSON File

Step 4: Create or Download .spectral.yaml Ruleset(Custom)(https://github.com/spliceforms/stoplight-projects/blob/main/sf-style-guide/.spectral.json)

  Note : save Both into same directory.

Step 5: Run Spectral Lint

  	=> To lint using built-in rules
  	 spectral lint <Your_File_Name>.yaml

  	=> To lint with your custom .spectral.yaml ruleset
	 spectral lint -r .spectral.yaml <Your_File_Name>.yaml

---
## Configure in VS Code

### Prerequisites

1. **Visual Studio Code**:
   Download and install [Visual Studio Code](https://code.visualstudio.com/).

2. **Spectral VS Code Extension**:
   Install the [Spectral](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral) extension from the VS Code Marketplace:
   - Open VS Code.
   - Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
   - Search for `Spectral`.
   - Click "Install" on the "Spectral" extension by Stoplight.

 ### setup

  1.	Open VS Code.
  2.	Go to Settings (Ctrl + , or Cmd + ,).
  3.	Search for Stoplight: Ruleset.
  4.	Set the path to:  https://raw.githubusercontent.com/spliceforms/stoplight-style-guide/refs/heads/main/sf-style-guide/.spectral.json
  5.	Save the settings and open a file to see if the ruleset is applied.

---
 ### Validating Files

Once the Spectral extension is configured, you can validate files by simply opening them in VS Code.

   1. Open any .yaml or .json file (e.g., OpenAPI specifications).
   2. The Spectral extension will automatically validate the file using your custom ruleset.
   3. View the linting results:
	    - Errors, warnings, and suggestions appear inline in the editor.
	    - A summary is available in the “Problems” panel (Ctrl+Shift+M or Cmd+Shift+M on macOS).




# This is the configuration for your development environment in Firebase Studio.
# It uses the Nix package manager to ensure a reproducible and consistent setup.

{ pkgs, ... }: {

  # Specifies the Nixpkgs channel to use for packages.
  # "stable-24.05" provides a stable set of packages from May 2024.
  channel = "stable-24.05";

  # A list of packages to install from the specified channel.
  packages = [
    # This creates a unified Python environment with all necessary packages.
    # Using `withPackages` is the idiomatic Nix way to ensure that the Python
    # interpreter and its packages are correctly linked.
    (pkgs.python3.withPackages (ps: [
      ps.pip          # Installs the pip package manager.
      ps.flask        # Installs the Flask web framework.
      ps.python-dotenv # Installs python-dotenv for managing .env files.
      ps.requests     # Installs the requests library for HTTP requests.
    ]))
  ];

  # A set of environment variables to define within the workspace.
  env = {
    # Tells Flask where to find the main application file.
    FLASK_APP = "app.py";
  };

  # Firebase Studio specific configurations.
  idx = {
    # A list of VS Code extensions to install from the Open VSX Registry.
    extensions = [
      "ms-python.python"  # Provides Python language support.
    ];

    # Workspace lifecycle hooks are not needed as Nix manages the dependencies.
    workspace = {};

    # Configures a web preview for your application.
    previews = {
      enable = true;
      previews = {
        # Defines a preview named "web".
        web = {
          # The command to run to start the web server.
          # The $PORT variable is dynamically assigned by Firebase Studio.
          command = [ "flask" "run" "--port" "$PORT" "--host" "0.0.0.0" ];
          # Specifies that this is a web server preview.
          manager = "web";
        };
      };
    };
  };
}

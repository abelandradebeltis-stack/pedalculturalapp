{ pkgs, ... }:
{
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # Or "unstable"

  # Use https://search.nixos.org/packages to find packages.
  packages = [
    pkgs.nodejs_20 # Bun is also available
  ];

  # Sets environment variables in the workspace.
  env = {};

  # Search for the starship package in nixpkgs
  # and create a .config/starship.toml file in the workspace directory.
  # See https://starship.rs/config/ for changing the prompt.
  # startup.sh = ''
  #  echo "Wellcome to your DEV Env"
  #  # You can also use startup.sh to install extensions or initializing any other services
  # '';
}

{
  description = "CubeArtisan";
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; };
        drv = with pkgs; pkgs.mkShell {
          name = "cubeartisan";
          buildInputs = [nodejs-16_x pkg-config cairo pango libpng libjpeg giflib gcc11 libuuid.out yarn docker-compose];
          shellHook = ''
            export LD_LIBRARY_PATH=${gcc11.out}/lib:${libuuid.out}/lib:$LD_LIBRARY_PATH
          '';
        };
      in
      {
        devShell = drv;
        defaultPackage = drv;
      }
    );
}

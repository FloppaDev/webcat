
{ pkgs ? import <nixpkgs> {} }:

with pkgs;

pkgs.mkShell {
  buildInputs = [
    python3 
    blender
  ];

  PROJECT_ROOT = builtins.toString ./.;
  shellHook = ''
    cd $PROJECT_ROOT
    (./sh/start.sh &)
  '';
}

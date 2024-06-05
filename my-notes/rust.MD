### set LD_LIBRARY_PATH
export LD_LIBRARY_PATH=$(rustc --print sysroot)/lib:$LD_LIBRARY_PATH
```
 rustc --print sysroot
/home/<user_name>/.rustup/toolchains/stable-x86_64-unknown-linux-gnu
```

### A cargo package can contain multiple binaries
```
[[bin]]
name = "abc"
path = "src/main.rs

[[bin]]
name = "second"
path = "src/second.rs"
```

### Cargo packages can have five types of targets
* [[bin]]: A binary target is an executable program
* [lib]: A library target produces a library that can be used by other libraries or executables
* [[example]]: examples for demonstration
* [[test]]
* [[bench]]: Benchmark functions defined in libraries and binaries are compiled into separate executables

### cargo dependencies and target
* [dependencies]: packages library or binary dependencies
* [dev-dependencies]: Dependencies for examples, tests, and benchmarks
* [build-dependencies]: Dependencies for build scripts
* [target]: This is for cross-compilation of code for various target architectures.
  * this is not to be confused with the output targets of the package, which can be lib, bin and so on.

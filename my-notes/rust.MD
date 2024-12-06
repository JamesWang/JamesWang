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
### Feature Flags
* #[cfg(predicate)] - instructs the compiler to only compile what it is attached to if the predicate is *true*
* #[cfg_attr(predicate, attribute)] - instruct the compiler to only enable the specified attribute(second argument) if the 
   predicate is *true*
* #[cfg_attr(not(predicate)) - returns *true* if the predicate is false and vice verse
* #[cfg_attr(all(predicate)), #[cfg_attr(any(predicate))]

## Rust Effect types
[#effect](https://blog.yoshuawuyts.com/extending-rusts-effect-system/)
* async { async_fn().await }; // async effect
* unsafe { unsafe_fn() };     // unsafe effect-like, not an effect
* const { const_fn() };       // const effect
* try { try_fn()? };          // try effect (unstable)
* || { yield my_type };       // generator effect (unstable)

- when you write async fn, the return type will desugar to an impl Future.

### Bench mark
* benchrs
 * Install, run
 ```
  cargo install benchrs
  benchrs -c 30 -n 3000 -k http://127.0.0.1:8000/
 ```

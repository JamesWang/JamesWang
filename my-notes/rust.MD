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

# PartialEq

In computer science, type systems, and languages like Rust, **`PartialEq`** is a trait (or interface) that defines **partial equivalence relations**. 

It is the mathematical and programmatic way of saying: *"These two things can be compared for equality, but there might be some values in this data type that are not equal to themselves."*

---

### 1. The Core Definition: What makes it "Partial"?

For a standard, common-sense equality relation (**Equivalence Relation**), three rules must always be true for all values:
1. **Reflexive:** `x == x` (Everything is equal to itself).
2. **Symmetric:** If `x == y`, then `y == x`.
3. **Transitive:** If `x == y` and `y == z`, then `x == z`.

**`PartialEq` drops the first rule (Reflexivity).** 

Under `PartialEq`, it is possible for a value to exist where `x == x` evaluates to **`false`**. Because it doesn't guarantee reflexivity, it is a *partial* equivalence.

---

### 2. The Classic Example: Floating-Point Numbers (`f32` / `f64`)

The absolute best example of why we need `PartialEq` is **`NaN` (Not-a-Number)** in floating-point math (IEEE 754 standard). 

By mathematical definition, `NaN` represents an undefined or unrepresentable numerical value (like 0.0 / 0.0). Because it has no defined value, it cannot equal anything—not even itself.

```rust
let nan = f64::NAN;

println!("{}", nan == nan); // Prints: false!
```

Because `NaN == NaN` is false, floating-point numbers (`f32`, `f64`) cannot implement full, total equality (`Eq`). They can only implement **`PartialEq`**.

---

### 3. Direct Comparison: `PartialEq` vs `Eq`

Many languages split equality into two tiers to preserve mathematical correctness:

| Trait / Concept | Properties Required | Example Types | Main Limitation |
| :--- | :--- | :--- | :--- |
| **`PartialEq`** | Symmetric, Transitive | `f32`, `f64`, Vectors containing floats | Cannot safely be used as keys in a hash map (`HashMap`), because `NaN` would break bucket lookups. |
| **`Eq`** | Reflexive, Symmetric, Transitive | `i32`, `String`, `bool` | Guaranteed that every single value is equal to itself (`x == x` is always true). |

---

### 4. Connection back to Smullyan's Birds & Lambda Calculus

Since you are exploring Lambda Calculus, `PartialEq` has a fascinating structural connection to how we handle computations in functional programming:

* **In pure Lambda Calculus:** Two functions are considered equal if they produce the exact same outputs for the exact same inputs (**Extensional Equality**). However, due to Alan Turing's **Halting Problem**, it is mathematically impossible to write a program that can look at any two arbitrary functions (birds) and definitively prove they are equal.
* **How `PartialEq` maps to this:** Because we can't always evaluate total equality for functions or infinite streams, we have to settle for **Partial Evaluation** or intentional, shallow structural equality checking. We can only assert that things are equal *under certain observable conditions*.


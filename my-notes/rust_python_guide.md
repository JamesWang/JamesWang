# Guide: Building a Rust Library for Python

This guide walks you through building a high-performance **Rust library (`.rs`)** that can be directly imported and called inside **Python** using **PyO3** and **Maturin**.

---

## 📋 Prerequisites
Ensure you have the following installed on your system:
* **Rust** (via `rustup`)
* **Python 3.8+**
* **pip** (Python package installer)

---

## 🛠️ Step-by-Step Setup

### Step 1: Set Up a Python Virtual Environment
Keep your dependencies isolated by creating and activating a dedicated virtual environment.

```bash
# Create the virtual environment
python -m venv .venv

# Activate it (Linux/macOS)
source .venv/bin/activate

# Activate it (Windows PowerShell)
# .\.venv\Scripts\Activate.ps1
```

### Step 2: Install Maturin
[Maturin](https://www.maturin.rs/) handles compiling the Rust binary and packaging it into a valid Python wheel.

```bash
pip install maturin
```

### Step 3: Initialize the Project
Create a new project folder and use `maturin init` to automatically configure the boilerplate files.

```bash
mkdir my_rust_lib
cd my_rust_lib

# Initialize the workspace
maturin init
```
*When prompted for bindings, select **`pyo3`**.*

### Step 4: Configure the Project Files

#### `Cargo.toml`
Maturin automatically configures your manifest. Ensure your `[lib]` section contains `crate-type = ["cdylib"]`, which tells Rust to output a shared library that Python can load.

```toml
[package]
name = "my_rust_lib"
version = "0.1.0"
edition = "2021"

[lib]
name = "my_rust_lib"
crate-type = ["cdylib"]

[dependencies]
pyo3 = { version = "0.22", features = ["extension-module"] }
```

---

## ✍️ Step 5: Write the Rust Code (`src/lib.rs`)
Open `src/lib.rs` and replace its contents with the following code. This exports a simple addition function to Python.

```rust
use pyo3::prelude::*;

/// A high-performance addition function exposed to Python
#[pyfunction]
fn add_numbers(a: i64, b: i64) -> PyResult<i64> {
    Ok(a + b)
}

/// Defines the actual Python module structure.
/// The module name must exactly match the library name in Cargo.toml.
#[pymodule]
fn my_rust_lib(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(add_numbers, m)?)?;
    Ok(())
}
```

---

## 🚀 Step 6: Compile and Link to Python
Run the build command to compile your Rust source and auto-install the compiled binary directly into your active virtual environment.

```bash
maturin develop
```
*(For production releases, use `maturin develop --release` to enable compiler optimization flags).*

---

## 🧪 Step 7: Verify inside Python
Create a testing script or open an interactive session to execute your compiled library.

```python
# test.py
import my_rust_lib

# Call your Rust engine
result = my_rust_lib.add_numbers(42, 58)

print(f"Result computed by Rust: {result}")
# Output: Result computed by Rust: 100
```

Run your test file:
```bash
python test.py
```

---

## 💡 Advanced Extensions

### Passing Types & Data
PyO3 handles primitive mappings automatically:
* Rust `String` / `&str` $\leftrightarrow$ Python `str`
* Rust `Vec<T>` $\leftrightarrow$ Python `list`
* Rust `HashMap<K, V>` $\leftrightarrow$ Python `dict`

### Releasing the GIL
For compute-heavy parallelism across multiple CPU cores, release the **Global Interpreter Lock (GIL)** inside your Rust function:

```rust
#[pyfunction]
fn heavy_computation(py: Python<'_>) -> PyResult<()> {
    py.allow_threads(|| {
        // Perform multi-threaded or heavy Rayon operations here
    });
    Ok(())
}
```
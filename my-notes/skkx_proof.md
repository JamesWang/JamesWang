# Proof: SKKx = x

In combinatory logic, every function or "bird" can be expressed using only two fundamental combinators: the **Kestrel (K)** and the **Starling (S)**. This document demonstrates step-by-step how combining these two birds results in the **Identity Bird (I)**, meaning that passing any input `x` to `SKK` returns `x`.

---

## 1. The Core Rules

Before running the proof, we must define the behavioral rules for our two fundamental birds:

*   **The Kestrel (K):** Actively acts as a "return left" function. It takes two parameters, completely ignores the second (right) parameter, and returns the first (left) parameter as-is.
    $$\mathbf{K} y z = y$$
*   **The Starling (S):** Acts as a distributor. It takes three parameters and distributes the third parameter to both the first and second parameters.
    $$\mathbf{S} y z w = y w (z w)$$

---

## 2. Step-by-Step Execution of SKKx

Let's evaluate the expression $\mathbf{S}\mathbf{K}\mathbf{K}x$ by mapping it directly to the Starling ($\mathbf{S}$) distribution rule:

1.  **Map the variables to the Starling rule:**
    *   Let the first parameter $y = \mathbf{K}$
    *   Let the second parameter $z = \mathbf{K}$
    *   Let the third parameter $w = x$

2.  **Apply the Starling rule ($y w (z w)$):**
    $$\mathbf{S}\mathbf{K}\mathbf{K}x \implies \mathbf{K}x(\mathbf{K}x)$$

3.  **Apply the Kestrel "Return Left" rule:**
    In the resulting expression $\mathbf{K}x(\mathbf{K}x)$, the first $\mathbf{K}$ is our function:
    *   The **left** parameter is $x$
    *   The **right** parameter is the expression in parentheses, $(\mathbf{K}x)$
    
    Since $\mathbf{K}$ always drops the right parameter and returns the left:
    $$\mathbf{K}x(\mathbf{K}x) \implies x$$

---

## 3. Conclusion

$$\mathbf{S}\mathbf{K}\mathbf{K}x = x$$

Because the combination $\mathbf{S}\mathbf{K}\mathbf{K}$ takes any arbitrary input $x$ and yields that exact same $x$ without modification, it is functionally identical to the **Identity Bird (I)** ($Ix = x$).

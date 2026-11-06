---
title: "Simulating quantum circuits"
description: "Naive simulation versus tensor networks, with example Python code."
polished: true
sources: [{"lecture":13,"pages":"16-17"}]
---
## Simulation of quantum circuits: naive approach vs tensor networks

Suppose we store an $n$-qubit state $\ket{\psi}$ as a vector with $2^n$ components. How expensive is it to apply a 1-qubit gate $U$ to the first qubit?

The naive approach treats $U$ as a $2^n \times 2^n$ matrix:

![Tensor diagram: n legs with U on the first leg feeding triangle psi, equals a box U tensor I tensor I tensor I of size 2^n x 2^n feeding triangle psi of size 2^n x 1](../../../assets/figures/L13-p16-1.png "w=556")

This has complexity $2^n \cdot 2^n \cdot 1 = 2^{2n}$, the cost of multiplying a $2^n \times 2^n$ matrix by a $2^n \times 1$ vector.

On the other hand, if we treat $U$ and $\ket{\psi}$ as tensors and only contract one index, we are effectively multiplying smaller matrices:

![Tensor diagram: 1 leg into box U (a 2x2 matrix), joined by 1 leg to psi (a 2 x 2^(n-1) matrix) which has n-1 legs](../../../assets/figures/L13-p16-2.png "w=315")

This has complexity $2 \cdot 2 \cdot 2^{n-1} = 2^{n+1}$, which is much better than the naive approach. Hence this is also the method used by many simulators, such as the one in Cirq.

Let's take a look at how to implement this in Python.

## Example Python code

If we store an $n$-qubit state $\ket{\psi}$ as a vector with $2^n$ components, we can apply 1-qubit and 2-qubit gates by contracting the legs on which the gate acts with a tensor describing the gate itself.

Suppose we want to apply a 2-qubit gate $U$ to qubits $p < q$ of $\ket{\psi}$:

![Tensor diagram: gate U with legs i, j in and k, l out, contracted with the state psi whose legs are grouped into a, b, c with legs k and l at positions p and q, equals the state psi with U inserted on those legs](../../../assets/figures/L13-p17-1.png "w=652")

First, create an all-zeroes vector with $2^n$ complex entries and initialize it to $\ket{0}^{\otimes n}$:

```python
state = np.zeros(2**n, np.complex64)
state[0] = 1+0j
```

Then group the legs into 5 groups of sizes $p, 1, q-p-1, 1, n-q-1$. These are labelled $a, k, b, l, c$ in the picture:

```python
psi = state.reshape([2**p, 2, 2**(q-p-1), 2, 2**(n-q-1)])
```

Finally, contract the gate and state tensors over $k$ and $l$:

```python
state = np.einsum('ijkl, akblc->aibjc', U, psi)
```

This is essentially what happens inside Cirq.

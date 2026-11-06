---
title: "Evolution, reduced states and quantum operations"
description: "Evolution of mixed states, the partial trace, and general quantum operations."
---
::pagesources{items="L13:6-9"}

## Evolution of mixed states

::source{lecture="13" pages="6"}

A pure state $\ket{\psi}$ evolves under a unitary operation $U$ as follows:

$$
\ket{\psi} \mapsto U\ket{\psi}.
$$

Since $(U\ket{\psi})^\dagger = \bra{\psi}U^\dagger$, the corresponding density matrix evolves as

$$
\ket{\psi}\!\bra{\psi} \mapsto U\ket{\psi}\!\bra{\psi}U^\dagger.
$$

In fact, any mixed state $\rho$ evolves as

$$
\rho \mapsto U\rho U^\dagger.
$$

In addition to unitary evolution, we can also add a new "clean" register in state $\ket{0}$:

$$
\ket{\psi} \mapsto \ket{\psi} \otimes \ket{0} \quad \text{or} \quad \rho \mapsto \rho \otimes \ket{0}\!\bra{0}.
$$

This is not a unitary operation since it increases the dimension.

We can also discard a register. Given some state $\ket{\Psi}_{AB}$, Alice can discard her system A. What is Bob's remaining state?

One way to think about this is to imagine that Alice measures her register in the standard basis and forgets the measurement outcome. We can then compute Bob's reduced state by averaging over all measurement outcomes.

## Reduced state

::source{lecture="13" pages="7-8"}

Let $\ket{\Psi}_{AB} \in \C^{d_A} \otimes \C^{d_B}$ be an arbitrary pure state shared between Alice and Bob. What is Bob's state if Alice measures her register and forgets the outcome? She gets outcome $k \in \{1, \dots, d_A\}$ with probability

$$
p_k = \norm{(\bra{k}_A \otimes I_B)\ket{\Psi}_{AB}}^2
$$

and Bob's remaining state in this case is

$$
\ket{\psi_k}_B = \frac{(\bra{k}_A \otimes I_B)\ket{\Psi}_{AB}}{\sqrt{p_k}}.
$$

If Alice forgets her measurement outcome $k$, the average state on Bob's system is

$$
\begin{aligned}
\sum_{k=1}^{d_A} p_k \ket{\psi_k}\!\bra{\psi_k} &= \sum_{k=1}^{d_A} (\bra{k}_A \otimes I_B)\ket{\Psi}\!\bra{\Psi}_{AB}(\ket{k}_A \otimes I_B) \\
&= \Tr_A(\ket{\Psi}\!\bra{\Psi}_{AB}) = \rho_B
\end{aligned}
$$

where $\Tr_A$ denotes the **partial trace** over Alice's system. In general, Bob's **reduced state** is found by computing the partial trace of their shared state:

$$
\rho_B = \Tr_A(\rho_{AB}) := \sum_{k=1}^{d_A} (\bra{k}_A \otimes I_B)\rho_{AB}(\ket{k}_A \otimes I_B).
$$

Note how this is similar to computing the regular trace,

$$
\Tr \rho_A = \sum_{k=1}^{d_A} \braket{k|\rho_A|k},
$$

except we also do nothing on the B register. The partial trace of B register is defined similarly.

::pagebreak{lecture="13" page="8"}

:::example[a product state]

Let $\ket{\Psi}_{AB} = \ket{\alpha}_A \otimes \ket{\beta}_B$. Note that

$$
\begin{aligned}
\ket{\Psi}\!\bra{\Psi}_{AB} &= (\ket{\alpha}_A \otimes \ket{\beta}_B)(\bra{\alpha}_A \otimes \bra{\beta}_B) \\
&= \ket{\alpha}\!\bra{\alpha}_A \otimes \ket{\beta}\!\bra{\beta}_B
\end{aligned}
$$

so

$$
\begin{aligned}
& \Tr_A(\ket{\Psi}\!\bra{\Psi}_{AB}) \\
&= \sum_{k=1}^{d_A} (\bra{k}_A \otimes I_B)(\ket{\alpha}\!\bra{\alpha}_A \otimes \ket{\beta}\!\bra{\beta}_B)(\ket{k}_A \otimes I_B) \\
&= \sum_{k=1}^{d_A} \braket{k|\alpha}\!\braket{\alpha|k} \otimes \ket{\beta}\!\bra{\beta}_B \\
&= \underbrace{\left(\sum_{k=1}^{d_A} \abs{\braket{k|\alpha}}^2\right)}_{1} \ket{\beta}\!\bra{\beta}_B = \ket{\beta}\!\bra{\beta}_B
\end{aligned}
$$

Since $\Tr_A$ corresponds to throwing away the A system, this is indeed the result we would expect.

:::

:::example[max. entangled state]

What remains if we throw away the A system of

$$
\ket{\beta_{00}}_{AB} = \frac{1}{\sqrt{2}}(\ket{00} + \ket{11}) \; ?
$$

Its density matrix is

$$
\ket{\beta_{00}}\!\bra{\beta_{00}}_{AB} = \frac{1}{2}\begin{pmatrix} \boxed{\begin{matrix} 1 & 0 \\ 0 & 0 \end{matrix}} & \begin{matrix} 0 & 1 \\ 0 & 0 \end{matrix} \\ \begin{matrix} 0 & 0 \\ 1 & 0 \end{matrix} & \boxed{\begin{matrix} 0 & 0 \\ 0 & 1 \end{matrix}} \end{pmatrix}
$$

and the remaining state

$$
\Tr_A(\ket{\beta_{00}}\!\bra{\beta_{00}}_{AB}) = \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + \frac{1}{2}\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} = \frac{1}{2}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}
$$

is maximally mixed. There is a sense in which the amount of entanglement in a pure bipartite state can be measured by the mixedness or "entropy" of the reduced state on one of the systems.

:::

## General quantum operation

::source{lecture="13" pages="9"}

The most general quantum operation or **quantum channel** consists of the following steps:

1. Add a new register initialized in some fixed state, say $\ket{0}$.
2. Apply a unitary on both registers.
3. Discard the second register.

This is known as a **Stinespring representation** of a quantum channel. Note that this includes adding a new register, applying a unitary on the given state, or discarding a register as special cases.

If you want to learn more about mixed states, quantum channels and entanglement, you should take Quantum Information Theory during your master's.

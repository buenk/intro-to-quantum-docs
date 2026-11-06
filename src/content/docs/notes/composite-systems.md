---
title: "Composite systems and entanglement"
description: "The computational basis, correlated and product distributions, entangled states, partial measurement."
---
::pagesources{items="L03:8-12" exercises="/exercises/postulates/#composite-systems-and-entanglement"}

## Tensor product and the computational basis

::source{lecture="3" pages="8"}

Given a qubit in state $\ket{0}$ and another one in state $\ket{1}$, their joint state is $\ket{0} \otimes \ket{1} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \otimes \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}$. We abbreviate this simply as $\ket{0,1}$ or $\ket{01}$. Similarly:

$$
\ket{00} = \begin{pmatrix} 1 \\ 0 \\ 0 \\ 0 \end{pmatrix} \quad \ket{01} = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix} \quad \ket{10} = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix} \quad \ket{11} = \begin{pmatrix} 0 \\ 0 \\ 0 \\ 1 \end{pmatrix}
$$

where the binary encoding of the location (starting from 0) of the entry 1 always coincides with the string inside the ket. These are called the **computational basis states**. They represent different bit strings that can be stored in a quantum computer. A general two-qubit state is a superposition of these four states:

$$
\alpha_{00}\ket{00} + \alpha_{01}\ket{01} + \alpha_{10}\ket{10} + \alpha_{11}\ket{11}
$$

$$
= \left.\begin{pmatrix} \alpha_{00} & \ket{00} \\ \alpha_{01} & \ket{01} \\ \alpha_{10} & \ket{10} \\ \alpha_{11} & \ket{11} \end{pmatrix}\right\}\text{ The order of the computational basis states is always alphabetical (or increasing for binary strings).}
$$

Similarly, $\ket{1111} \in \C^8$ is a vector with 1 in the last (7-th when starting from 0) component.

## Correlated versus product distributions

::source{lecture="3" pages="9"}

Given two probabilistic bits $p = \begin{pmatrix} p_0 \\ p_1 \end{pmatrix}$ and $q = \begin{pmatrix} q_0 \\ q_1 \end{pmatrix}$, their joint distribution is

$$
p \otimes q = \begin{pmatrix} p_0 \\ p_1 \end{pmatrix} \otimes \begin{pmatrix} q_0 \\ q_1 \end{pmatrix} = \begin{pmatrix} p_0 \begin{pmatrix} q_0 \\ q_1 \end{pmatrix} \\ p_1 \begin{pmatrix} q_0 \\ q_1 \end{pmatrix} \end{pmatrix} = \begin{pmatrix} p_0 q_0 \\ p_0 q_1 \\ p_1 q_0 \\ p_1 q_1 \end{pmatrix} \begin{matrix} 00 \\ 01 \\ 10 \\ 11 \end{matrix}
$$

Such distributions are called **product**. They represent independent random bits. But is every distribution a product distribution? That is, for a given $r = \begin{pmatrix} r_{00} \\ r_{01} \\ r_{10} \\ r_{11} \end{pmatrix}$, can we always find $p = \begin{pmatrix} p_0 \\ p_1 \end{pmatrix}$ and $q = \begin{pmatrix} q_0 \\ q_1 \end{pmatrix}$ such that $r = p \otimes q$?

:::example
If $r = \frac{1}{2}\begin{pmatrix} 1 \\ 0 \\ 0 \\ 1 \end{pmatrix} = \begin{pmatrix} p_0 q_0 \\ p_0 q_1 \\ p_1 q_0 \\ p_1 q_1 \end{pmatrix}$ then $p_0 q_1 = 0$, implying $p_0 = 0$ or $q_1 = 0$. The first case contradicts $p_0 q_0 = \frac{1}{2}$ and the second case contradicts $p_1 q_1 = \frac{1}{2}$, implying that $r$ is **not** a product distribution.
:::

Distributions that are not product are called **correlated**.

## Product and entangled states

::source{lecture="3" pages="10"}

Similar terminology applies also to two-qubit quantum states. If $\ket{\Psi} \in \C^2 \otimes \C^2 = \C^4$ is of the form $\ket{\Psi} = \ket{\psi_1} \otimes \ket{\psi_2}$ for some $\ket{\psi_1}, \ket{\psi_2} \in \C^2$, it is called a **product state**. Otherwise it is called **entangled**.

:::example
$\frac{1}{2}\left(\ket{00} + \ket{01} + \ket{10} + \ket{11}\right) = \frac{1}{\sqrt{2}}\left(\ket{0} + \ket{1}\right) \otimes \frac{1}{\sqrt{2}}\left(\ket{0} + \ket{1}\right)$ so it is a product state.
:::

:::example
$\frac{1}{\sqrt{2}}\left(\ket{00} + \ket{11}\right)$ and $\frac{1}{\sqrt{2}}\left(\ket{01} + \ket{10}\right)$ are both entangled.
:::

:::note
Physical separation does not imply that the joint state must be product. Just like two distant random coins can still be correlated, two physically separated particles can still be entangled, as long as they had a chance to interact at some point in the past.
:::

## Measuring one out of two bits

::source{lecture="3" pages="11"}

Given two probabilistic bits in state $\begin{pmatrix} r_{00} \\ r_{01} \\ r_{10} \\ r_{11} \end{pmatrix}$ the probability of observing the first bit in state 0 is $r_{00} + r_{01}$. The state of the remaining bit is

$$
\begin{cases} 0 & \text{w.p. } \dfrac{r_{00}}{r_{00} + r_{01}} \\[2ex] 1 & \text{w.p. } \dfrac{r_{01}}{r_{00} + r_{01}} \end{cases}
$$

In particular, if the two bits are in a product state then $r_{00} = p_0 q_0$ and $r_{01} = p_0 q_1$ so the second bit $q$ of $p \otimes q$ is not affected if the first bit is measured since

$$
\frac{r_{00}}{r_{00} + r_{01}} = \frac{p_0 q_0}{p_0 (q_0 + q_1)} = \frac{q_0}{q_0 + q_1} = q_0 \quad\text{since } q_0 + q_1 = 1
$$

and

$$
\frac{r_{01}}{r_{00} + r_{01}} = \frac{p_0 q_1}{p_0 (q_0 + q_1)} = \frac{q_1}{q_0 + q_1} = q_1 .
$$

On the other hand, if the two bits are correlated the state of the unmeasured bit depends on the outcome of the measurement performed on the other bit.

:::example
If the first bit of $\frac{1}{2}\begin{pmatrix} 1 \\ 0 \\ 0 \\ 1 \end{pmatrix}$ is measured, each outcome occurs with probability $1/2$ and the state of the second bit is equal to the measurement outcome from the first bit.
:::

## Measuring one out of two qubits

::source{lecture="3" pages="12"}

The rule for this is similar, except we are dealing with amplitudes instead of probabilities. Let's say we measure the first qubit of $\psi_{00}\ket{00} + \psi_{01}\ket{01} + \psi_{10}\ket{10} + \psi_{11}\ket{11}$. We get outcome

$$
\begin{cases} 0 & \text{w.p. } \abs{\psi_{00}}^2 + \abs{\psi_{01}}^2 = p_0 \\ 1 & \text{w.p. } \abs{\psi_{10}}^2 + \abs{\psi_{11}}^2 = p_1 \end{cases}
$$

If the outcome was $k \in \{0,1\}$, the state on the second qubit is

$$
\frac{1}{\sqrt{p_k}}\left(\psi_{k0}\ket{0} + \psi_{k1}\ket{1}\right)
$$

This is a unit vector since $p_k = \abs{\psi_{k0}}^2 + \abs{\psi_{k1}}^2$. Just like with probabilistic bits, the state of the remaining qubit is unaffected by a measurement of the first qubit if the initial state was a product state. Otherwise (if the qubits were entangled), the second qubit's state depends on the outcomes of the measurement on the first qubit.

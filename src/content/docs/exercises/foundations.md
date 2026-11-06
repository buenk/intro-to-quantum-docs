---
title: "Exercises: Foundations"
description: "Exercises on probabilistic bits, complex numbers, and the qubit."
---
::pagesources{label="Exercise sheets:" items="E01:1-2"}

## Probabilistic bits

::pagesources{label="Notes:" notes="/notes/probabilistic-bits/"}

### Random operation

::source{sheet="1" exercise="1" pages="1"}

Write down the linear transformation that with probability $q_0$ leaves a probabilistic bit alone and with probability $q_1$ inverts it. Is this the most general operation you can perform on a probabilistic bit?

### Guessing the coin

::source{sheet="1" exercise="2" pages="1"}

Let $A$ and $B$ be biased coins whose probability distributions are $(1/3, 2/3)$ and $(3/5, 2/5)$. With probability $1/2$ you are given a sample from coin $A$ and with probability $1/2$ a sample from coin $B$. Your goal is to guess from which coin the sample came. What is the best strategy for doing this and with what probability does it succeed?

## Complex numbers

::pagesources{label="Notes:" notes="/notes/complex-numbers/"}

### Converting between representations

::source{sheet="1" exercise="3" pages="1"}

Let $z$ be a complex number. Derive formulas for converting between the exponential representation $z = re^{i\varphi}$ and the algebraic representation $z = a + ib$.

1. Assume $z = re^{i\varphi}$ and express $a$ and $b$ in terms of $r$ and $\varphi$.
2. Assume $z = a + ib$ and express $r$ and $\varphi$ in terms of $a$ and $b$.

### Angle sum identities

::source{sheet="1" exercise="4" pages="1"}

Use Euler's formula and $e^{i(\alpha+\beta)} = e^{i\alpha} \cdot e^{i\beta}$ to derive a formula for $\cos(\alpha+\beta)$ and $\sin(\alpha+\beta)$.

### Multiplication geometrically

::source{sheet="1" exercise="5" pages="1"}

What is the geometric interpretation of the equation $r_1 e^{i\varphi_1} \cdot r_2 e^{i\varphi_2} = r_1 r_2 e^{i(\varphi_1+\varphi_2)}$ for complex number multiplication?

### Inverse

::source{sheet="1" exercise="6" pages="1"}

In quantum computing we generally do not need to divide complex numbers. However, in case you are curious and would like to know how to do this, notice that $x/z = x \cdot 1/z$. Now it only remains to figure out how to find the inverse $1/z$.

1. Let $z = re^{i\varphi}$. Compute $1/z$ in the exponential form.
2. Show that the inverse of any $z \in \mathbb{C}$ can be found as follows: $1/z = \bar{z}/|z|^2$.

## Qubits and the Bloch sphere

::pagesources{label="Notes:" notes="/notes/qubits/"}

### Discriminating |+⟩ and |−⟩

::source{sheet="1" exercise="7" pages="1"}

Consider the qubit states $\ket{+} := \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})$ and $\ket{-} := \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})$. Find a qubit operation $U$ such that measuring the states $U\ket{+}$ and $U\ket{-}$ in the standard basis produces opposite outcomes with certainty, thus allowing the states to be perfectly discriminated.

### Bloch vector is a unit vector

::source{sheet="1" exercise="8" pages="1"}

Let $\psi_0, \psi_1 \in \mathbb{C}$ be such that $\ket{\psi} = \psi_0\ket{0} + \psi_1\ket{1}$ is a qubit state, i.e., $|\psi_0|^2 + |\psi_1|^2 = 1$. Let $(x, y, z)$ be the Bloch vector corresponding to $\ket{\psi}$:

$$
\begin{cases}
x = 2\,\mathrm{Re}(\bar\psi_0 \psi_1), \\
y = 2\,\mathrm{Im}(\bar\psi_0 \psi_1), \\
z = |\psi_0|^2 - |\psi_1|^2.
\end{cases}
$$

Verify that $x^2 + y^2 + z^2 = 1$, meaning that $(x, y, z)$ is a unit vector in $\mathbb{R}^3$.

### Locating states on the Bloch sphere

::source{sheet="1" exercise="9" pages="2"}

Find the Bloch vectors corresponding to the following six qubit states:

$$
\begin{array}{lll}
\ket{0}, & \ket{+} := (\ket{0} + \ket{1})/\sqrt{2}, & \ket{+i} := (\ket{0} + i\ket{1})/\sqrt{2}, \\
\ket{1}, & \ket{-} := (\ket{0} - \ket{1})/\sqrt{2}, & \ket{-i} := (\ket{0} - i\ket{1})/\sqrt{2}.
\end{array}
$$

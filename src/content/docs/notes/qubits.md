---
title: "Qubits and the Bloch sphere"
description: "Qubit states, measurement, qubit operations, phases and the Bloch sphere."
polished: true
sources: [{"lecture":1,"pages":"9-14"}]
exercisesLink: "/exercises/foundations/#qubits-and-the-bloch-sphere"
---
## From probabilistic bits to qubits

A quantum bit, or **qubit**, works much like a [probabilistic bit](/notes/probabilistic-bits/). There are only two differences:

1. the probabilities are replaced by complex numbers called **amplitudes**;
2. the amplitudes are squared when you measure.

Everything else in quantum computing is a consequence of these two small changes!

Unlike probabilities, amplitudes can be negative or even complex, so when you add them they can cancel out. This important effect is called **interference**. It does not happen with probabilities, which are never negative.

## Qubit states

For probabilistic bits we wrote the deterministic states as $\textcircled{0}$ and $\textcircled{1}$. For qubits we use the same two vectors, but write them as "kets":

$$
\ket{0} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \qquad\qquad \ket{1} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}
$$

A general qubit state is a **superposition** (or linear combination) of these:

$$
\psi_0 \ket{0} + \psi_1 \ket{1} = \psi_0 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + \psi_1 \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} \psi_0 \\ \psi_1 \end{pmatrix}
$$

Here $\psi_0, \psi_1 \in \C$ are the **amplitudes**. They must satisfy

$$
|\psi_0|^2 + |\psi_1|^2 = 1
$$

This is the qubit version of $p_0 + p_1 = 1$: as the next section shows, $|\psi_0|^2$ and $|\psi_1|^2$ are the probabilities of the two measurement outcomes.

## Measuring a qubit

Measuring a qubit works like measuring a probabilistic bit, except that the probability of each outcome is given by the **Born rule**:

$$
\text{probability} = |\text{amplitude}|^2
$$

So you get outcome 0 with probability $|\psi_0|^2$ and outcome 1 with probability $|\psi_1|^2$:

$$
\begin{pmatrix} \psi_0 \\ \psi_1 \end{pmatrix}
\ \xrightarrow{\ |\psi_0|^2\ }\ \ket{0}
\qquad
\begin{pmatrix} \psi_0 \\ \psi_1 \end{pmatrix}
\ \xrightarrow{\ |\psi_1|^2\ }\ \ket{1}
$$

If the outcome is $k \in \{0, 1\}$, the state after the measurement becomes $\ket{k}$ and the original state is gone. In particular, you don't learn $\psi_0$ or $\psi_1$ this way, just as measuring a probabilistic bit does not tell you $p_0$ or $p_1$.

## Quantum NOT

Just like for probabilistic bits, quantum operations are **extended by linearity**. NOT swaps $\ket{0}$ and $\ket{1}$, so on a general state it swaps the two amplitudes:

$$
\begin{aligned}
\mathrm{NOT}\left(\psi_0 \ket{0} + \psi_1 \ket{1}\right) &= \psi_0\, \mathrm{NOT} \ket{0} + \psi_1\, \mathrm{NOT} \ket{1} \\
&= \psi_0 \ket{1} + \psi_1 \ket{0}.
\end{aligned}
$$

The output is again a valid quantum state: its amplitudes are the same two numbers in the other order, so their squared absolute values still add up to $|\psi_0|^2 + |\psi_1|^2 = 1$.

## General qubit operation

What does a general operation on a qubit look like? Call it $U$. Because $U$ is linear, it is determined by what it does to $\ket{0}$ and $\ket{1}$. For some $a, b, c, d \in \C$,

$$
U\ket{0} = \begin{pmatrix} a \\ b \end{pmatrix} \qquad\text{and}\qquad U\ket{1} = \begin{pmatrix} c \\ d \end{pmatrix}
$$

These are quantum states too, so

$$
|a|^2 + |b|^2 = 1 \qquad\text{and}\qquad |c|^2 + |d|^2 = 1
$$

Are these the only constraints? To find out, apply $U$ to an arbitrary qubit state $\ket{\psi} := \psi_0 \ket{0} + \psi_1 \ket{1}$, with $|\psi_0|^2 + |\psi_1|^2 = 1$. By linearity,

$$
U\ket{\psi} = \psi_0 U\ket{0} + \psi_1 U\ket{1} = \psi_0 \begin{pmatrix} a \\ b \end{pmatrix} + \psi_1 \begin{pmatrix} c \\ d \end{pmatrix} = \begin{pmatrix} \psi_0 a + \psi_1 c \\ \psi_0 b + \psi_1 d \end{pmatrix} = \begin{pmatrix} \psi_0' \\ \psi_1' \end{pmatrix}
$$

This must also be a quantum state, so its squared amplitudes must add up to 1. Expanding them with $z \cdot \bar{z} = |z|^2$ (see [complex conjugation](/notes/complex-numbers/#complex-conjugation)):

$$
\begin{aligned}
|\psi_0'|^2 + |\psi_1'|^2 &= |\psi_0 a + \psi_1 c|^2 + |\psi_0 b + \psi_1 d|^2 \\
&= (\psi_0 a + \psi_1 c)(\bar{\psi}_0 \bar{a} + \bar{\psi}_1 \bar{c}) + (\psi_0 b + \psi_1 d)(\bar{\psi}_0 \bar{b} + \bar{\psi}_1 \bar{d}) \\
&= |\psi_0|^2 \underbrace{(|a|^2 + |b|^2)}_{1} + |\psi_1|^2 \underbrace{(|c|^2 + |d|^2)}_{1} \\
&\quad + \psi_0 \bar{\psi}_1 \underbrace{(a\bar{c} + b\bar{d})}_{0} + \psi_1 \bar{\psi}_0 \underbrace{(c\bar{a} + d\bar{b})}_{0} \\
&= |\psi_0|^2 + |\psi_1|^2 \quad\text{for all } \psi_0, \psi_1 \in \C.
\end{aligned}
$$

The first two brackets equal 1 by the constraints we already have. For the total to be 1 for every state, the last two brackets must be 0. They are complex conjugates of each other, since $c\bar{a} + d\bar{b} = \overline{a\bar{c} + b\bar{d}}$, so this adds just one new condition:

:::theorem[General qubit operation]
A general qubit operation is a matrix

$$
U = \begin{pmatrix} a & c \\ b & d \end{pmatrix}
$$

where $a, b, c, d \in \C$ are such that

$$
|a|^2 + |b|^2 = 1, \qquad |c|^2 + |d|^2 = 1, \qquad a\bar{c} + b\bar{d} = 0.
$$
:::

Matrices like this are called *unitary*. The same argument works in any dimension; see [the postulates of quantum mechanics](/notes/postulates/).

## Global and relative phases

The **phase** of a complex number $re^{i\varphi}$ is $e^{i\varphi}$. Two states can differ by a phase in two ways, and only one of them matters.

### Global phase

Two vectors $\ket{\psi}$ and $\ket{\psi'}$ differ only by a **global phase** if

$$
\ket{\psi} = e^{i\varphi} \ket{\psi'} \qquad\qquad \text{for some } \varphi \in \R.
$$

Such states produce the same measurement statistics, since $|e^{i\varphi} z| = |z|$ for any $z \in \C$. Moreover, $U\ket{\psi} = e^{i\varphi} U\ket{\psi'}$, so they still differ only by a global phase after any operation $U$. No experiment can tell them apart: $\ket{\psi}$ and $\ket{\psi'}$ represent the same physical reality.

### Relative phase

For comparison, consider

$$
\ket{+} = \frac{1}{\sqrt{2}} (\ket{0} + \ket{1}) \qquad\text{and}\qquad \ket{-} = \frac{1}{\sqrt{2}} (\ket{0} - \ket{1})
$$

They also produce the same measurement statistics:

$$
\begin{cases}
0 & \text{with probability } \frac{1}{2} \\
1 & \text{with probability } \frac{1}{2}
\end{cases}
$$

Are $\ket{+}$ and $\ket{-}$ the same state? No. You can find an operation $U$ with $U\ket{+} = \ket{0}$ and $U\ket{-} = \ket{1}$, for example $U = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$. Measuring after $U$ then tells the two states apart with certainty.

The two states differ only in the sign in front of $\ket{1}$, and $-1 = e^{i\pi}$. In general, the $e^{i\varphi}$ in $\ket{0} + e^{i\varphi}\ket{1}$ is called a **relative phase**.

:::note[Remember]
Global phase doesn't matter, relative phase matters!
:::

## Qubit geometry

Since we can ignore the global phase, any qubit state can be written as

$$
\ket{\psi} = \underbrace{\cos\frac{\theta}{2}}_{\psi_0} \ket{0} + e^{i\varphi} \underbrace{\sin\frac{\theta}{2}}_{\psi_1} \ket{1}
$$

for some angles $\theta \in [0, \pi]$ and $\varphi \in [0, 2\pi)$. To see this, multiply the state by a global phase that makes $\psi_0$ real and non-negative, so $\psi_0 \in [0, 1]$. Since $|\psi_0|^2 + |\psi_1|^2 = 1$, we can then write $\psi_0 = \cos\frac{\theta}{2}$ and $|\psi_1| = \sin\frac{\theta}{2}$, and $e^{i\varphi}$ is the phase of $\psi_1$. (The angle is halved so that $\theta$ becomes the polar angle on the Bloch sphere below.)

At the two extreme values of $\theta$, something special happens:

$$
\begin{aligned}
\theta = 0 &\implies \ket{\psi} = \ket{0} \\
\theta = \pi &\implies \ket{\psi} = e^{i\varphi}\ket{1} \overset{\text{``up to global phase''}}{\sim} \ket{1}
\end{aligned}
$$

In both cases the parameter $\varphi$ has become redundant. This is similar to how longitude becomes irrelevant at the poles of the Earth, which suggests that a qubit has the same topology as a sphere! Indeed, there is a one-to-one correspondence between qubit states $\ket{\psi} \in \C^2$ (up to global phase)[^fix-1] and unit vectors in $\R^3$:

$$
\begin{pmatrix} \psi_0 \\ \psi_1 \end{pmatrix} \in \C^2 \quad\longrightarrow\quad \begin{pmatrix} 2\,\mathrm{Re}(\bar{\psi}_0 \psi_1) \\ 2\,\mathrm{Im}(\bar{\psi}_0 \psi_1) \\ |\psi_0|^2 - |\psi_1|^2 \end{pmatrix} \in \R^3
$$

The resulting vector in $\R^3$ is called the **Bloch vector** of $\ket{\psi}$.

::pagebreak{lecture="1" page="14"}

Going the other way, a unit vector $(x, y, z)$ corresponds to the state

$$
\frac{1}{\sqrt{2(z+1)}} \begin{pmatrix} z + 1 \\ x + iy \end{pmatrix} \in \C^2 \quad\longleftarrow\quad \begin{pmatrix} x \\ y \\ z \end{pmatrix} \in \R^3
$$

This formula needs $z \neq -1$. The remaining point $(0, 0, -1)$ corresponds to $\ket{1}$.[^fix-2]

## Bloch sphere

Since Bloch vectors are unit vectors, qubit states correspond to the points of the unit sphere, called the **Bloch sphere**. The correspondence is particularly elegant in spherical coordinates: the angles $\theta$ and $\varphi$ of the state are the angles of its Bloch vector.

![Bloch sphere with x, y, z axes; a bold unit vector from the origin at polar angle theta from the z axis and azimuthal angle phi from the x axis in the xy plane, with dashed projection lines](../../../assets/figures/L01-p14-1.png "w=468")

$$
\begin{pmatrix} \cos\frac{\theta}{2} \\ e^{i\varphi} \sin\frac{\theta}{2} \end{pmatrix} \longrightarrow
\begin{cases}
x = \sin\theta \cos\varphi \\
y = \sin\theta \sin\varphi \\
z = \cos\theta
\end{cases}
$$

For example, $\ket{0}$ is the north pole ($\theta = 0$), $\ket{1}$ is the south pole ($\theta = \pi$), and $\ket{+}$ and $\ket{-}$ sit at opposite points on the equator ($\theta = \frac{\pi}{2}$, with $\varphi = 0$ and $\varphi = \pi$).

[^fix-1]: Corrected from the original notes, which leave out *up to global phase*. States that differ by a global phase have the same Bloch vector.
[^fix-2]: Corrected from the original notes, which do not say that the formula fails at $z = -1$.

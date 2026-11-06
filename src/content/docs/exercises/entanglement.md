---
title: "Exercises: Entanglement and communication"
description: "Exercises on bell states, superdense coding, teleportation, non-local games and observables."
sources: [{"sheet":7,"pages":"1-2"},{"sheet":8,"pages":"1-2"}]
---
## Bell states and superdense coding

::pagesources{label="Notes:" notes="/notes/superdense-coding/"}

### Pauli matrices and Bell states

::extag{sheet="7" exercise="1"}

Recall from the lecture notes that the four Pauli matrices are:

$$
I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}, \qquad X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \qquad Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \qquad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}.
$$

Also, recall that the four Bell states are:

$$
\begin{aligned}
\ket{\beta_{00}} &= \frac{1}{\sqrt 2}(\ket{00} + \ket{11}), & \ket{\beta_{01}} &= \frac{1}{\sqrt 2}(\ket{01} + \ket{10}), \\
\ket{\beta_{10}} &= \frac{1}{\sqrt 2}(\ket{00} - \ket{11}), & \ket{\beta_{11}} &= \frac{1}{\sqrt 2}(\ket{01} - \ket{10}).
\end{aligned}
$$

Finally, recall the vectorization operation:

$$
\mathrm{vec}\begin{pmatrix} a & b \\ c & d \end{pmatrix} = \begin{pmatrix} a \\ b \\ c \\ d \end{pmatrix}.
$$

Match each Pauli matrix with the corresponding Bell state. That is, for each Pauli matrix $P$, find a constant $c \in \C$ and a Bell state $\ket{\beta_{zx}}$ such that

$$
\mathrm{vec}(P) = c\sqrt 2 \ket{\beta_{zx}}.
$$

### Local conversion of Bell states

::extag{sheet="7" exercise="2"}

Verify that any Bell state can be converted to any other by applying some combination of Pauli $X$ and $Z$ matrices to one of the qubits.

1. Verify that for any $z, x \in \{0,1\}$,

   $$
   \ket{\beta_{zx}} = (Z^z X^x \otimes I)\ket{\beta_{00}}.
   $$

2. Verify that for any $z, x \in \{0,1\}$,

   $$
   \ket{\beta_{zx}} = (I \otimes X^x Z^z)\ket{\beta_{00}}.
   $$

3. Find a sequence $S$ of Pauli $X$ and $Z$ matrices such that

   $$
   \ket{\beta_{10}} = (S \otimes I)\ket{\beta_{11}}.
   $$

### Cirq: Superdense coding

::extag{sheet="7" exercise="3"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

### H ⊗ H on Bell states

::extag{sheet="8" exercise="4"}

Verify that

$$
(H \otimes H)\ket{\beta_{zx}} = (-1)^{zx} \ket{\beta_{xz}},
$$

for all $z, x \in \{0,1\}$, where $\ket{\beta_{zx}}$ are the Bell states.

*Hint:* Use the circuit that prepares $\ket{\beta_{zx}}$ from $\ket{z, x}$ and the fact that Hadamarding both inputs and outputs of CNOT turns it upside down (recall Exercise 1 from Lecture 5).

## Quantum teleportation

::pagesources{label="Notes:" notes="/notes/teleportation/"}

### SWAP and the Pauli matrices

::extag{sheet="7" exercise="4"}

Recall that the SWAP operation is defined on the computational basis states as follows:

$$
\mathrm{SWAP}\ket{a, b} = \ket{b, a}
$$

for all $a, b \in \{0,1\}$.

1. Verify that

   $$
   \mathrm{SWAP} = \frac{1}{2}(I \otimes I + X \otimes X + Y \otimes Y + Z \otimes Z).
   $$

2. Verify that

   $$
   \mathrm{SWAP} = \frac{1}{2} \sum_{z,x \in \{0,1\}} Z^z X^x \otimes X^x Z^z.
   $$

### Teleportation identity

::extag{sheet="7" exercise="5"}

The goal of this exercise is to explicitly verify the teleportation identity

$$
\ket{\psi} \otimes \ket{\beta_{00}} = \frac{1}{2} \sum_{z,x \in \{0,1\}} \ket{\beta_{zx}} \otimes X^x Z^z \ket{\psi}. \tag{1}
$$

Let $\ket{\psi} = \alpha\ket{0} + \beta\ket{1}$ be an arbitrary single-qubit state.

1. Substitute $\ket{\psi}$ and $\ket{\beta_{00}}$ in $\ket{\psi} \otimes \ket{\beta_{00}}$ and expand it as a linear combination of the computational basis states. This gives you an expression for the left-hand side of eq. (1).

2. Compute $X^x Z^z \ket{\psi}$ for all $x, z \in \{0,1\}$. Then tensor each of these states with the corresponding Bell state $\ket{\beta_{zx}}$ and compute $\ket{\beta_{zx}} \otimes X^x Z^z \ket{\psi}$, for each $x, z \in \{0,1\}$. Expand each of these four expressions as linear combinations of the computational basis states. This gives you the four terms on the right-hand side of eq. (1).

3. Sum the four terms together and verify that both sides of eq. (1) agree.

### Cirq: Teleportation

::extag{sheet="7" exercise="6"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

## Non-locality: GHZ and CHSH games

::pagesources{label="Notes:" notes="/notes/non-local-games/"}

### Quantum correlations

::extag{sheet="8" exercise="1"}

Let $U = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ be an arbitrary unitary operation.

1. Let $\ket{\beta_{00}} = \frac{1}{\sqrt 2}(\ket{00} + \ket{11})$. Compute the state

   $$
   (U \otimes U^*)\ket{\beta_{00}}
   $$

   where $U^*$ denotes the entry-wise complex conjugate of $U$. Simplify the result using the fact that $U$ is unitary.

2. Let $\ket{\beta_{11}} = \frac{1}{\sqrt 2}(\ket{01} - \ket{10})$. Compute the state

   $$
   (U \otimes U)\ket{\beta_{11}}.
   $$

   How does it compare to the original state $\ket{\beta_{11}}$?

3. How are the measurement outcomes of both qubits correlated if $(U \otimes U^*)\ket{\beta_{00}}$ is measured in the standard basis? How about $(U \otimes U)\ket{\beta_{11}}$?

### Measuring two probabilistic bits

::extag{sheet="8" exercise="2"}

Let

$$
r = r_{00}[00] + r_{01}[01] + r_{10}[10] + r_{11}[11] = \begin{pmatrix} r_{00} \\ r_{01} \\ r_{10} \\ r_{11} \end{pmatrix}
$$

be an arbitrary state on two probabilistic bits, where Alice holds the first bit and Bob holds the second bit.

1. If Alice measures her bit, what are the probabilities for her to obtain outcomes 0 and 1, and what are the corresponding post-measurement states of Bob's bit?

2. In each case, what is the probability for Bob to obtain the outcome 0 if he measures his bit? Average these two probabilities over the probabilities of Alice's measurement outcomes.

3. Compare this to the scenario when Bob directly measures the second bit of $r$ without waiting for Alice to complete her measurement.

### Alice tries to signal to Bob

::extag{sheet="8" exercise="3"}

Let $\ket{\psi} \in \C^4$ be an arbitrary two-qubit state shared by Alice and Bob. Assume that Alice tries to influence Bob's measurement outcomes by applying a unitary operation $U$ on her qubit.

1. What is the probability $p_i$ for Bob to obtain measurement outcome $i \in \{0,1\}$ when measuring the second qubit of $\ket{\psi}$?

2. Compute the same probability when measuring the second qubit of $(U \otimes I)\ket{\psi}$. How do they compare?

### CHSH game

::extag{sheet="8" exercise="5"}

The goal of this exercise is to verify the quantum strategy for the CHSH game.

1. Recall the expressions for the following two Bell states:

   $$
   \ket{\beta_{10}} = \frac{1}{\sqrt 2}(\ket{00} - \ket{11}), \qquad \ket{\beta_{01}} = \frac{1}{\sqrt 2}(\ket{01} + \ket{10}).
   $$

   For any $\alpha \in \R$, define

   $$
   G(\alpha) = \begin{pmatrix} \cos\alpha & -\sin\alpha \\ \sin\alpha & \cos\alpha \end{pmatrix}
   $$

   and verify that

   $$
   \big(G(\alpha_1) \otimes G(\alpha_2)\big)\ket{\beta_{10}} = \cos(\alpha_1 + \alpha_2)\ket{\beta_{10}} + \sin(\alpha_1 + \alpha_2)\ket{\beta_{01}}. \tag{1}
   $$

2. Assume that both qubits of the state in eq. (1) are measured in the standard basis and denote the two measurement outcomes by $a, b \in \{0,1\}$. What is the probability $p(\alpha_1, \alpha_2)$ that $a \oplus b = 0$ as a function of the two angles $\alpha_1$ and $\alpha_2$?

3. Let $s, t \in \{0,1\}$ denote the input bits of Alice and Bob, respectively. Recall that Alice's strategy is to apply $G(\theta_s)$ and Bob's strategy is to apply $G(\theta_t)$ on their qubits, where

   $$
   \theta_0 = -\pi/16, \qquad \theta_1 = 3\pi/16.
   $$

   Verify that their measurement outcomes $a, b \in \{0,1\}$ always satisfy the relation

   $$
   a \oplus b = \mathrm{AND}(s, t)
   $$

   with probability $\cos^2(\pi/8) \approx 0.85$.

### Cirq: Construction of the GHZ-state

::extag{sheet="8" exercise="6"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

### Cirq: Quantum square game

::extag{sheet="8" exercise="7"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

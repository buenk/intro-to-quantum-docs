---
title: "The postulates of quantum mechanics"
description: "The rules of the game for probabilistic bits and for qubits."
---
::pagesources{items="L03:1-4" exercises="/exercises/postulates/#the-postulates-of-quantum-mechanics"}

::source{lecture="3" pages="1"}

This lecture is about the postulates of quantum mechanics. You can think of them as the "rules of the game". On a high level, they are about:

1. states
2. time-evolution
3. measurement
4. composite systems

For comparison, we will also look at the corresponding postulates for probabilistic bits. In both cases, I could just state them and you would have to simply accept that that's how it is. But let us try to look more deeply and try to understand their origin (ideally, we would like to derive them from some simple and reasonable assumptions):

1. The state space should be somehow bounded (you don't need infinitely large numbers) and a linear space (if two states are allowed then so are their linear combinations). It contains deterministic states (like 0 and 1).
2. Operations should map states to states and be linear.
3. The probabilities of measurement outcomes sum to one. Each outcome results in a new (deterministic) state.
4. If system A has $n$ deterministic states and B has $m$ then together A and B have $n \times m$ deterministic states.

## Probabilistic bits: rules of the game

::source{lecture="3" pages="2"}

1. The state space is a linear space over $\R$, consisting of vectors

$$
p = \begin{pmatrix} p_1 \\ p_2 \\ \vdots \\ p_n \end{pmatrix}
$$

bounded by $p_i \geq 0$ and $p_1 + p_2 + \dots + p_n = 1$, also known as **probability distributions**.

2. Transformations are linear and preserve the property of being a probability distribution. That is, if $\sum_{j=1}^n p_j = 1$ and $p' = Mp$ then $\sum_{i=1}^n p'_i = 1$. Note that

$$
p'_i = \sum_{j=1}^n M_{ij} p_j \quad\text{so}\quad \sum_{i=1}^n p'_i = \sum_{i,j=1}^n M_{ij} p_j = \sum_{j=1}^n \left( \sum_{i=1}^n M_{ij} \right) p_j .
$$

We want $\sum_{i=1}^n p'_i = 1$ (for all possible $p$), so we must have

$$
\sum_{i=1}^n M_{ij} = 1 . \qquad \text{(the $j$-th column sums to 1)}
$$

Similarly, we want $p'_i \geq 0$ which imply $M_{ij} \geq 0$. In other words, each column of $M$ is a probability distribution itself. Such matrices are called **stochastic**.

3. Measuring $p$ yields outcome $i$ with probability $p_i$ and the state after the measurement is the $i$-th standard basis vector $\begin{pmatrix} 0 \\ \vdots \\ 1 \\ \vdots \\ 0 \end{pmatrix} \leftarrow i$

4. If system A is in state $i$ with probability $p_i$ and system B is in state $j$ with probability $q_j$ then together AB is in state $(i,j)$ with probability $p_i q_j$. This is precisely captured by the tensor product:

$$
\underbrace{p}_{\text{state of A}} \otimes \underbrace{q}_{\text{state of B}} = \begin{pmatrix} p_1 \\ p_2 \\ p_3 \end{pmatrix} \otimes \begin{pmatrix} q_1 \\ q_2 \end{pmatrix} = \underbrace{\begin{pmatrix} p_1 q_1 \\ p_1 q_2 \\ p_2 q_1 \\ p_2 q_2 \\ p_3 q_1 \\ p_3 q_2 \end{pmatrix}}_{\text{state of AB}}
$$

## Quantum rules of the game

::source{lecture="3" pages="3"}

1. The state space is a linear space over $\C$ consisting of vectors

$$
\ket{\psi} = \begin{pmatrix} \alpha_1 \\ \alpha_2 \\ \vdots \\ \alpha_n \end{pmatrix}
$$

such that $\abs{\alpha_1}^2 + \abs{\alpha_2}^2 + \dots + \abs{\alpha_n}^2 = 1$.

Equivalently, $\ket{\psi}$ is a **unit vector**: $\braket{\psi|\psi} = 1$.

2. Transformations are linear (over $\C$) and map unit vectors to unit vectors. Equivalently, they **preserve norms**. If $\ket{\psi'} = U\ket{\psi}$ then $\bra{\psi'} = \bra{\psi}U^\dagger$.

$$
\braket{\psi'|\psi'} = \braket{\psi|U^\dagger U|\psi} = \braket{\psi|\psi} = 1
$$

*(This has to hold for all states $\ket{\psi}$.)*

Using an argument similar to one in Lecture 1, the only way this equality can hold simultaneously for all $\ket{\psi}$ is if $U^\dagger U = I$. This means $U^{-1} = U^\dagger$ where $U^{-1}$ denotes the inverse of $U$. Since $UU^{-1} = I$ too, the conditions

$$
U^\dagger U = I \quad\text{and}\quad UU^\dagger = I
$$

are equivalent and either of them implies that $U$ is **unitary**.

3. Measuring $\ket{\psi} \in \C^n$ (in the standard basis) produces outcome $i \in \{1, \dots, n\}$ with probability

$$
\abs{\braket{i|\psi}}^2 = \abs{\alpha_i}^2
$$

and the state after the measurement is $\ket{i}$.

4. If system A is in state $\ket{A}$ and system B is in state $\ket{B}$ then AB together are in state

$$
\ket{A} \otimes \ket{B} .
$$

## A few words about physics

::source{lecture="3" pages="4"}

Quantum mechanics is a branch of physics that describes the behaviour of small systems, such as atoms, photons, and electrons, whose states admit superpositions. It is a framework onto which other physical theories are built upon. For example, quantum field theories such as quantum electrodynamics and chromodynamics. Quantum mechanics itself does not prescribe the state space of particular physical systems, this is done by more specific theories. Any physical system whose state space is $\C^2$ can serve as an implementation of a qubit. For example, the spin of an electron, polarization of a photon, or current in a superconducting circuit. In this course we consider only finite-dimensional systems. But some systems may require an infinite-dimensional Hilbert space. Also, the time evolution of actual physical systems is continuous and described by a differential equation, the Schrödinger equation:

$$
i \frac{d}{dt} \ket{\psi(t)} = \underbrace{H}_{\text{Hamiltonian (a Hermitian matrix)}} \ket{\psi(t)}
$$

whose solution is $\ket{\psi(t)} = U(t)\ket{\psi(0)}$ where $U(t) = \exp(-iHt)$ is unitary.

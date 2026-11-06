---
title: "Exercises: Quantum mechanics"
description: "Exercises on the rules of the game: states, evolution, measurement and composite systems."
sources: [{"sheet":3,"pages":"1-2"}]
---
## The postulates of quantum mechanics

::pagesources{label="Notes:" notes="/notes/postulates/"}

### Schrödinger equation

::extag{sheet="3" exercise="5"}

Recall that Schrödinger equation is a differential equation that describes the continuous-time evolution of a quantum system. It looks as follows:

$$
i\frac{d}{dt}\ket{\psi(t)} = H\ket{\psi(t)},
$$

where $\ket{\psi(t)}$ is the state of the system at time $t$ and $H$ is the Hamiltonian that governs the dynamics. The solution of this equation is given by

$$
\ket{\psi(t)} = \exp(-iHt)\ket{\psi(0)}
$$

where $\ket{\psi(0)}$ is the initial state at time $t = 0$. To understand how such evolution may look like, consider the intial state $\ket{\psi(0)} = \ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})$ and let the Hamiltonian be

$$
H = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}.
$$

1. Compute the state $\ket{\psi(t)}$ at time $t$.
2. Locate this state on the Bloch sphere.

## Change of basis and measurement

::pagesources{label="Notes:" notes="/notes/change-of-basis/"}

### Unitary transformations and orthonormal bases

::extag{sheet="3" exercise="1"}

Let $U$ be a unitary matrix of size $n \times n$ and define vectors $\ket{u_i} = U\ket{i}$, for each $i \in \{1,\dots,n\}$.

1. Show that $\ket{u_1},\dots,\ket{u_n}$ is an orthonormal basis of $\mathbb{C}^n$.
2. Show that $\sum_{i=1}^n \ketbra{u_i}{u_i} = I$ where $I = \sum_{i=1}^n \ketbra{i}{i}$ is the $n \times n$ identity matrix.
3. Show that, for any vector $\ket{\psi} \in \mathbb{C}^n$, $\ket{\psi} = \sum_{i=1}^n \braket{u_i|\psi}\ket{u_i}$.
4. Let $V$ be another $n \times n$ unitary matrix and let $\ket{v_i} = V\ket{i}$, for each $i \in \{1,\dots,n\}$. Show that the matrix $W = \sum_{i=1}^n \ketbra{u_i}{v_i}$ is unitary.
5. Express $W$ in terms of $U$ and $V$.

### Simulating a measurement in another basis

::extag{sheet="3" exercise="2"}

Your quantum computer can measure only in the standard basis $\ket{1},\dots,\ket{n}$, but your boss gives you a state $\ket{\psi} \in \mathbb{C}^n$ and asks to measure it some arbitrary orthonormal basis $\ket{u_1},\dots,\ket{u_n} \in \mathbb{C}^n$. Luckily, you can do this using the following steps:

- (1) apply $U^\dagger = \sum_{i=1}^n \ketbra{i}{u_i}$ to $\ket{\psi}$,
- (2) perform the standard basis measurement on the resulting state,
- (3) apply $U$ on the post-measurement state.

Verify that these three steps are indeed equivalent to measuring $\ket{\psi}$ in the basis $\ket{u_1},\dots,\ket{u_n}$. Namely, check that

1. the probability to get outcome $i$ in step (2) is $|\braket{u_i|\psi}|^2$,
2. the final state after step (3) is $\ket{u_i}$.

### Basis change

::extag{sheet="3" exercise="3"}

Express the matrix $X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ in the basis $\left\{ \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ i \end{pmatrix}, \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -i \end{pmatrix} \right\}$.

## Composite systems and entanglement

::pagesources{label="Notes:" notes="/notes/composite-systems/"}

### Entanglement and local operations

::extag{sheet="3" exercise="4"}

Assume that $\ket{\Psi}$ is an entangled two-qubit state. Show that $\ket{\Psi'} = (U \otimes V)\ket{\Psi}$ is also entangled, for any choice of single-qubit unitary transformations $U$ and $V$.

### Measuring one qubit at a time

::extag{sheet="3" exercise="6"}

A two-qubit system is in the following state:

$$
\ket{\psi} = \frac{1}{\sqrt{30}}\left(\ket{00} + 2i\ket{01} - 3\ket{10} - 4i\ket{11}\right).
$$

1. What is the probability of outcome $1$ if the first qubit is measured in the standard basis?
2. What is the state of both qubits afterwards?
3. What is the probability that a subsequent standard basis measurement of the second qubit will produce the outcome $1$?
4. What is the probability of obtaining the outcome $11$ if we would instead measure both qubits of $\ket{\psi}$ simultaneously?
5. What is the probability of getting the outcome $11$ when the two qubits of $\ket{\psi}$ are measured consecutively (first, the first qubit and then the second qubit)? You can use the probabilities derived in steps 1. and 3. to compute this.

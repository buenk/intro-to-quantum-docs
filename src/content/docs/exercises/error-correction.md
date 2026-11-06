---
title: "Exercises: Error correction"
description: "Exercises on repetition codes, quantum error correction and the Steane code."
---
::pagesources{label="Exercise sheets:" items="E12:1-3"}

## Error correction for bits

::pagesources{label="Notes:" notes="/notes/classical-error-correction/"}

### CNOT gymnastics

::source{sheet="12" exercise="1" pages="1"}

Prove the following circuit identities:

1. Switching $X$ and $Z$:

   ![Two circuit identities. Left: H on the target qubit, then CNOT, then H on the target equals a controlled-Z. Right: H on the target, controlled-Z, H on the target equals a CNOT](../../../assets/figures/E12-p01-1.png "w=659")

2. Controlled-$Z$ is out of control:

   ![Circuit identity: controlled-Z with control on the top qubit and Z on the bottom qubit equals controlled-Z with Z on the top qubit and control on the bottom qubit](../../../assets/figures/E12-p01-2.png "w=210")

3. Whaaaat?

   ![Circuit identity: H on both qubits, then CNOT (control top, target bottom), then H on both qubits equals a CNOT with control on the bottom qubit and target on the top qubit](../../../assets/figures/E12-p01-3.png "w=292")

### Propagation of Pauli errors

::source{sheet="12" exercise="2" pages="1-2"}

Prove the following circuit identities:

1. Pauli $X$ moves through CNOT:

   ![Two circuit identities. Left: X on the target before a CNOT equals a CNOT followed by X on the target. Right: X on the control before a CNOT equals a CNOT followed by X on both control and target](../../../assets/figures/E12-p01-4.png "w=629")

2. Pauli $Z$ moves through CNOT:

   ![Two circuit identities. Left: Z on the control before a CNOT equals a CNOT followed by Z on the control. Right: Z on the target before a CNOT equals a CNOT followed by Z on both control and target](../../../assets/figures/E12-p01-5.png "w=623")

::pagebreak{sheet="12" page="2"}

3. Pauli $X$ moves through Toffoli:

   ![Two circuit identities. Left: X on the first qubit before a Toffoli (controls on qubits 1 and 2, target on qubit 3) equals a Toffoli followed by X on qubit 1 and a CNOT (control 2, target 3). Right: X on qubits 1 and 2 before a Toffoli equals a Toffoli, a CNOT (control 1, target 3) and a CNOT (control 2, target 3), followed by X on all three qubits](../../../assets/figures/E12-p02-1.png "w=705")

4. Assume an $X$ error occurs on the last qubit of the state $\ket{\Psi}$. Propagate this error through the circuit that implements the detection and correction steps of the three-bit repetition code. What effect does this error have once it is moved to the right-hand side of the circuit?

   ![Circuit: three qubits forming the state Psi plus two ancilla qubits initialised to |0>; an X error on the third Psi qubit, followed by CNOTs from the second and third Psi qubits onto the first ancilla, CNOTs from the first and third Psi qubits onto the second ancilla, and correction gates controlled on the ancillas](../../../assets/figures/E12-p02-2.png "w=403")

## Quantum error correction

::pagesources{label="Notes:" notes="/notes/quantum-error-correction/"}

### Measuring non-commuting observables

::source{sheet="12" exercise="3" pages="2"}

Let $\ket{\psi} = \ket{0}$. Consider the following two scenarios that correspond to measuring the observables $Z$ and $X$ in different order:

1. First measure $\ket{\psi}$ in the standard basis, then in the $\ket{\pm}$ basis (this is the same as first measuring the $Z$ observable and then the $X$ observable).

2. First measure $\ket{\psi}$ in the $\ket{\pm}$ basis, then in the standard basis (this is the same as first measuring the $X$ observable and then the $Z$ observable).

Denote the measurement outcomes in the two cases by $a_1, b_1 \in \{0,1\}$ and $a_2, b_2 \in \{0,1\}$, respectively. What are the probability distributions of the strings $a_1 b_1$ and $a_2 b_2$?

### Commuting matrices can be simultaneously diagonalized

::source{sheet="12" exercise="4" pages="2"}

Let $A$ and $B$ be two normal (and hence diagonalizable) matrices. For simplicity, assume they are $2 \times 2$ and invertible. Show that if $AB = BA$ then there is a unitary matrix $U$ such that $UAU^\dagger$ and $UBU^\dagger$ are both diagonal.

### Stabilizers of Bell states

::source{sheet="12" exercise="5" pages="3"}

Recall that the four Bell states are as follows:

$$
\begin{aligned}
\ket{\beta_{00}} &= \tfrac{1}{\sqrt{2}}(\ket{00} + \ket{11}), & \ket{\beta_{01}} &= \tfrac{1}{\sqrt{2}}(\ket{01} + \ket{10}), \\
\ket{\beta_{10}} &= \tfrac{1}{\sqrt{2}}(\ket{00} - \ket{11}), & \ket{\beta_{11}} &= \tfrac{1}{\sqrt{2}}(\ket{01} - \ket{10}).
\end{aligned}
$$

Note that $\ket{\beta_{00}}$ is stabilized by $X_1 X_2$ and $Z_1 Z_2$:

$$
(X \otimes X)\ket{\beta_{00}} = \ket{\beta_{00}}, \qquad\qquad (Z \otimes Z)\ket{\beta_{00}} = \ket{\beta_{00}}.
$$

Find the stabilizers of the other Bell states.

## The Steane code

::pagesources{label="Notes:" notes="/notes/steane-code/"}

### Cirq: Steane code

::source{sheet="12" exercise="6" pages="3"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

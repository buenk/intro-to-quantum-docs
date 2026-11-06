---
title: "Grover's algorithm"
description: "Unstructured search, Grover's algorithm, its analysis and implementation."
---
::pagesources{items="L09:1-9" exercises="/exercises/algorithms/#grovers-algorithm"}

## The search problem

::source{lecture="9" pages="1-2"}

*Grover's algorithm*

::pagebreak{lecture="9" page="1"}

**Problem:** Let $f:\{0,1\}^n \to \{0,1\}$ s.t.

$$
f(x) = \begin{cases} 1 & \text{if } x = a \text{ for some } a \in \{0,1\}^n \\ 0 & \text{otherwise} \end{cases}
$$

Searching through $2^n$ different entries classically:

- sorted data: $\log_2(2^n) = n$ queries using binary search
- unsorted data: $2^n$ queries by brute force

Quantum brute-force search: $\sqrt{2^n}$ queries.

More generally, $N$ versus $\sqrt{N}$ queries when searching through $N$ items.

**Oracle:**
$$
O_f \ket{x} = (-1)^{f(x)} \ket{x} = \begin{cases} -\ket{x} & \text{if } x = a \\ \ket{x} & \text{otherwise} \end{cases}
$$

:::example
Example 1 Explicitly storing the password for a user:
$$
f(x) = \begin{cases} 1 & \text{if } x = \text{"password"} \\ 0 & \text{otherwise} \end{cases}
$$

is problematic in case the source code of $f$ gets stolen.
:::

::pagebreak{lecture="9" page="2"}

:::example
Example 2 Storing the hash (e.g. SHA) of a password:
$$
f(x) = \begin{cases} 1 & \text{if } h(x) = \text{"73A0F2BE5"} \\ 0 & \text{otherwise} \end{cases}
$$
:::

The hash function $h$ is easy to compute but hard to invert. A hacker cannot easily recover the password even if the data is stolen. The source code of $f$ contains only the source code of the hash function $h$, which usually is already public, and the string "73A0F2BE5" which does not reveal the password in a straightforward way. The only way to crack it is by brute force.

## Grover's algorithm

::source{lecture="9" pages="2"}

Let $N = 2^n$ be the size of the set we are searching in.

![Circuit: n qubits start in |0>, a Hadamard on each (steps 1 and 2), then repeated blocks of oracle O_f (steps 2-3) followed by W (step 4), brace labelled O(sqrt N) repetitions, then measurement of every qubit](../../../assets/figures/L09-p02-1.png "w=644")

O($\sqrt{N}$) repetitions

1. $\ket{0}^{\otimes n}$
2. $\ket{+}^{\otimes n} = \frac{1}{\sqrt{2^n}} \sum_{x \in \{0,1\}^n} \ket{x}$
3. $\frac{1}{\sqrt{2^n}} \left( \left( \sum_{x \in \{0,1\}^n} \ket{x} \right) - 2\ket{a} \right)$

We want to get $a \in \{0,1\}^n$ as the answer, so we want to amplify the amplitude of $\ket{a}$

$$
O_f \ket{x} = \begin{cases} -\ket{x} & \text{if } x = a \\ \ket{x} & \text{otherwise} \end{cases}
$$

Can check that:

$$
O_f = I - 2\ket{a}\!\bra{a}
$$

$$
O_f = \begin{array}{cc} & \hspace{1.2em} a \\ a & \begin{pmatrix} 1 & & & & \\ & \ddots & & & \\ & & -1 & & \\ & & & \ddots & \\ & & & & 1 \end{pmatrix} \end{array}
$$

## Main idea

::source{lecture="9" pages="3"}

two consecutive reflections make a rotation.

Let $\ket{\Psi} = \ket{+}^{\otimes n} = \frac{1}{\sqrt{2^n}} \sum_{x \in \{0,1\}^n} \ket{x}$ be the uniform superposition and let $W = -(I - 2\ket{\Psi}\!\bra{\Psi})$ be the reflection with respect to $\ket{\Psi}$.

Let $G = W O_f$ be one Grover iteration.

The final state after $N$ iterations is

$$
G^{\sqrt{N}} H^{\otimes n} \ket{0}^{\otimes n} = G^{\sqrt{N}} \ket{+}^{\otimes n} = G^{\sqrt{N}} \ket{\Psi}.
$$

Let's analyze how one step of the Grover iteration $G = W O_f$ affects the state. Recall that

$$
W = 2\ket{\Psi}\!\bra{\Psi} - I \qquad O_f = I - 2\ket{a}\!\bra{a}
$$

Note that $\braket{\Psi|a} = \braket{a|\Psi} = 1/\sqrt{2^n} = 1/\sqrt{N}$. Consider how $W$ and $O_f$ act on $\ket{\Psi}$ and $\ket{a}$:

$$
W\ket{\Psi} = \ket{\Psi} \qquad O_f \ket{\Psi} = \ket{\Psi} - \frac{2}{\sqrt{N}} \ket{a}
$$

$$
W\ket{a} = \frac{2}{\sqrt{N}} \ket{\Psi} - \ket{a} \qquad O_f \ket{a} = -\ket{a}
$$

So starting from the state $\ket{\Psi}$ and applying any sequence of $O_f$ and $W$ will still give you a real linear combination of $\ket{a}$ and $\ket{\Psi}$, i.e., the state remains in the 2-dim subspace:

$$
\alpha \ket{\Psi} + \beta \ket{a} \quad \text{for some } \alpha, \beta \in \mathbb{R}
$$

## Geometric view of Grover's algorithm

::source{lecture="9" pages="4"}

- Since $O_f\ket{a} = -\ket{a}$, $O_f$ reflects about the line $\perp$ to $\ket{a}$.
- Since $W\ket{\Psi} = \ket{\Psi}$, $W$ is a reflection about $\ket{\Psi}$.

Recall that $\braket{a|\Psi} = 1/\sqrt{N}$, so $\ket{a}$ and $\ket{\Psi}$ are almost orthogonal.

![Plane with axes |a> (vertical) and a horizontal dashed line; |Psi> at angle theta above the horizontal, O_f|Psi> at angle theta below it, and W O_f|Psi> (step 4) at angle 2 theta above |Psi>; arrows labelled W and O_f indicate the reflections](../../../assets/figures/L09-p04-1.png "w=559")

**Exercise:**

:::exercise
The composition of two reflections is a rotation.

If the angle between the axes is $\theta$, the angle of rotation is $2\theta$.
:::

## Analysis of complexity

::source{lecture="9" pages="5"}

The Grover iteration $G = W O_f$ is a rotation by angle $2\theta$ from $\ket{\Psi}$ to $\ket{a}$, where the angle between $\ket{\Psi}$ and $\ket{a}$ is $\pi/2 - \theta$. Note that

$$
\sin\theta = \cos\left(\frac{\pi}{2} - \theta\right) = \braket{a|\Psi} = 1/\sqrt{N}.
$$

If $N$ is large, $\ket{\Psi}$ and $\ket{a}$ are nearly orthogonal so $\theta$ is small and

$$
\theta \approx \sin\theta = 1/\sqrt{N}.
$$

After $t = \frac{\pi/2}{2\theta} \approx \frac{\pi}{4}\sqrt{N}$ iterations of $G$, the final state $G^t\ket{\Psi}$ is within angle $\theta$ of $\ket{a}$:

![Plane with |a> pointing up and |Psi> near the horizontal at angle theta; successive rotations by 2 theta bring the state towards |a>, ending within angle theta of it (a narrow cone around |a>)](../../../assets/figures/L09-p05-1.png "w=441")

Measuring in the comp. basis yields $a \in \{0,1\}^n$ w.p.

$$
|\braket{a|G^t|\Psi}|^2 \geq (\cos\theta)^2 = 1 - (\sin\theta)^2 = \frac{N-1}{N} \approx 1
$$

when $N$ is large. Note that further iterations beyond $t$ decrease the probability of success.

## Multiple solutions

::source{lecture="9" pages="6"}

Grover's alg works even if the solution $a \in \{0,1\}^n$ is not unique. Let $A \subseteq \{0,1\}^n$ be a set of possible solutions, $M = |A|$. Then Grover's iteration is a rotation in the 2-dim subspace spanned by

$$
\ket{\Psi} = \frac{1}{\sqrt{N}} \sum_{x \in \{0,1\}^n} \ket{x} \quad \text{and} \quad \ket{A} = \frac{1}{\sqrt{M}} \sum_{a \in A} \ket{a}.
$$

The angle $\theta$ between these vectors is smaller, so the required number of iterations (but also the success prob.) is also smaller.

The number of iterations: $t = O(\sqrt{N/M})$.

Prob. of success: $1 - \frac{M}{N}$.

## Implementing W

::source{lecture="9" pages="7-8"}

$W = 2\ket{\Psi}\!\bra{\Psi} - I$, $\ket{\Psi} = \ket{+}^{\otimes n}$. *($H^{\otimes n}\ket{\Psi} = \ket{0}^{\otimes n}$)*

Note that

$$
H^{\otimes n} W H^{\otimes n} = 2\ket{0^n}\!\bra{0^n} - I
$$

$$
= \underbrace{\begin{pmatrix} 1 & & & \\ & -1 & & \\ & & -1 & \\ & & & \ddots \\ & & & & -1 \end{pmatrix}}_{\leftarrow\, 00\ldots0}
$$

Conjugate further by $X^{\otimes n}$:

$$
-X^{\otimes n} H^{\otimes n} W H^{\otimes n} X^{\otimes n} = -(2\ket{1^n}\!\bra{1^n} - I) = I - 2\ket{1^n}\!\bra{1^n}
$$

$$
= \underbrace{\begin{pmatrix} 1 & & & \\ & 1 & & \\ & & \ddots & \\ & & & -1 \end{pmatrix}}_{\leftarrow\, 11\ldots1} = C_{n-1}(Z)
$$

where $C_{n-1}(U)$ is the multiply controlled $U$ operation:

![Circuit: n-1 control qubits (dots) connected to a controlled-U gate on one target qubit](../../../assets/figures/L09-p07-1.png "w=161")

$$
C_{n-1}(U) = \begin{pmatrix} 1 & & & & 0 \\ & 1 & & & \\ & & \ddots & & \\ & & & 1 & \\ 0 & & & & \boxed{U} \end{pmatrix}
$$

*(rows labelled $11\ldots10$ and $11\ldots11$ for the $U$ block)*

$$
= \boxed{\sum_{x \in \{0,1\}^{n-1} \setminus \{1^{n-1}\}} \ket{x}\!\bra{x} \otimes I + \ket{1^{n-1}}\!\bra{1^{n-1}} \otimes U}
$$

E.g. $C_1(X) = \text{CNOT}$. Since $HZH = X$,

$$
C_1(Z) = (I \otimes H)\,\text{CNOT}\,(I \otimes H).
$$

$$
W = \underbrace{-}_{\text{can ignore this global phase}} H^{\otimes n} X^{\otimes n} C_{n-1}(Z) X^{\otimes n} H^{\otimes n}
$$

::pagebreak{lecture="9" page="8"}

$$
C_{n-1}(U)\ket{x_1}\ket{x_2}\ldots\ket{x_{n-1}}\ket{\psi}
$$

<!-- unclear: right-hand side drawn as wires/dashes in place of the control kets: "= ___ 1 ___ U^{x_1...x_{n-1}}|psi>" -->

$$
= \ket{x_1}\ket{x_2}\ldots\ket{x_{n-1}}\; U^{x_1 \cdots x_{n-1}}\ket{\psi}
$$

![Circuit identity: the box W on n wires equals (-1) times a circuit with H on every qubit, X on every qubit, a controlled-Z across all qubits, X on every qubit, then H on every qubit](../../../assets/figures/L09-p08-1.png "w=611")

How to implement $C_{n-1}(U)$?

![Circuit identity: a gate with three controls x1, x2, x3 on U acting on |psi> (in C^2) equals a circuit with two workspace qubits |0>; arrow labelled Toffoli = C_2(X): Toffoli = C_2(X) computes x1x2 into the first workspace qubit, a Toffoli computes x1x2x3 into the second, a controlled-U acts on |psi>, then the Toffolis are undone; outputs |x1>, |x2>, |x3> (restored), |0>, |0> (the workspace) and U^{x1x2x3}|psi>](../../../assets/figures/L09-p08-2.png "w=769")

This uses $O(n)$ Toffoli gates and $O(n)$ workspace.

Can we further decompose Toffoli into 1&2 qubit gates?

:::exercise
Exercise: Any 1-qubit operation can be decomposed as a sequence of Pauli ZYZ rotations.
:::

:::exercise
Exercise: For any $U \in U(2)$, $C_1(U)$ can be implemented using only CNOT and Pauli rotations (ABC decomposition).
:::

## Special trick for C₂(U)

::source{lecture="9" pages="9"}

For any $U \in U(2)$, $C_2(U)$ can be implemented as follows:

find $V \in U(2)$ s.t. $V^2 = U$

![Circuit identity: doubly controlled U on |psi> equals controlled-V from x2, CNOT from x1 onto x2, controlled-V-dagger from x2, CNOT from x1 onto x2, then controlled-V from x1, all acting on |psi>](../../../assets/figures/L09-p09-1.png "w=615")

Only if $x_1 = x_2 = 1$ we apply $V^2 = U$.

When $U = X$ we get a decomposition for Toffoli.

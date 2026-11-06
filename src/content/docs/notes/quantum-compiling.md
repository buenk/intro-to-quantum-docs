---
title: "Quantum compiling"
description: "Decomposing an arbitrary unitary into Givens rotations, CNOTs and single-qubit gates."
polished: true
sources: [{"lecture":9,"pages":"10-12"}]
exercisesLink: "/exercises/circuits/#quantum-compiling"
---
## Quantum compiling

Given some $n$-qubit unitary $U \in U(2^n)$, how do we implement it as a sequence of only 1- and 2-qubit gates (only CNOTs, say)?

![A large unitary matrix (scribble) equals, question mark, a circuit made of single-qubit gates and CNOTs on n qubits, "etc."](../../../assets/figures/L09-p10-1.png "w=712")

The main idea is that a $2 \times 2$ unitary can turn any vector $(\alpha, \beta)$ into one whose second entry is 0:

$$
\underbrace{\frac{1}{\sqrt{|\alpha|^2 + |\beta|^2}} \begin{pmatrix} \bar{\alpha} & \bar{\beta} \\ -\beta & \alpha \end{pmatrix}}_{\text{Unitary}} \underbrace{\begin{pmatrix} \alpha \\ \beta \end{pmatrix}}_{\in\, \mathbb{C}^2} = \begin{pmatrix} \sqrt{|\alpha|^2 + |\beta|^2} \\ 0 \end{pmatrix}
$$

The generalization of this is the QR decomposition. For $\alpha, \beta \in \mathbb{C}$ and $i, j \in \{0,1\}^n$, the **Givens rotation** $G_{ij}(\alpha, \beta)$ applies the $2 \times 2$ unitary above to coordinates $i$ and $j$, and leaves all other coordinates alone:

$$
G_{ij}(\alpha, \beta) = \frac{1}{\sqrt{|\alpha|^2 + |\beta|^2}} \begin{pmatrix} 1 & & & & & \\ & \ddots & & & & \\ & & \bar{\alpha} & & \bar{\beta} & \\ & & & 1 & & \\ & & & & \ddots & \\ & & -\beta & & \alpha & \\ & & & & & 1 \\ & & & & & & \ddots \end{pmatrix}
$$

The entries $\bar\alpha, \bar\beta$ are in row $i$, columns $i$ and $j$; the entries $-\beta, \alpha$ are in row $j$, columns $i$ and $j$; all other diagonal entries are $1$.

For example, take a unitary $U$ with rows labelled $0, 1, 2$. Each Givens rotation sets one more entry below the diagonal to 0:

$$
\underbrace{\begin{pmatrix} * & * & * \\ \alpha & * & * \\ \beta & * & * \end{pmatrix}}_{U} \xmapsto{G_{1,2}(\alpha,\beta)} \begin{pmatrix} \gamma & * & * \\ \delta & * & * \\ 0 & * & * \end{pmatrix} \xmapsto{G_{0,1}(\gamma,\delta)} \begin{pmatrix} 1 & \underbrace{0 \quad 0}_{\text{because unitary}} \\ 0 & \varepsilon & * \\ 0 & \varphi & * \end{pmatrix}
$$

$$
\xmapsto{G_{1,2}(\varepsilon,\varphi)} \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & * \end{pmatrix}
$$

The entry $*$ that remains is $e^{i\theta} = \det(U)$.

::pagebreak{lecture="9" page="11"}

In the same way, we can decompose any $n$-qubit unitary as a sequence of at most $4^n$ Givens rotations.[^fix-1]

How do we implement an arbitrary Givens rotation $G_{ij}(\alpha, \beta)$? The following steps implement $G_{ij}(U)$, defined below, for any $2 \times 2$ unitary $U$:

1. Find a bit where $i, j \in \{0,1\}^n$[^fix-2] differ and use it as a control in the next step.
2. Make all other differing bits of $i$ and $j$ the same by applying CNOTs that use them as targets.
3. Apply $X$ to all bits where $i$ and $j$ are now 0.
4. Apply $U$ on the bit where $i$ and $j$ still differ, using all other bits as controls.
5. Undo steps 3, 2 and 1.

For example, with $n = 6$:

![Bit strings with positions 1 to 6: i = 0 1 1 1 0 0 and j = 1 1 0 0 1 0; the fifth bits (boxed) are marked different and used as a control; the other differing bits of j, marked with small digits, are labelled flip to agree with i (n bits)](../../../assets/figures/L09-p11-1.png "w=354")

The result is the matrix $G_{ij}(U)$, which applies $U$ to coordinates $i$ and $j$:

$$
\begin{pmatrix} 1 & & & & & \\ & \ddots & & & & \\ & & u_{00} & & u_{01} & \\ & & & 1 & & \\ & & & & \ddots & \\ & & u_{10} & & u_{11} & \\ & & & & & 1 \\ & & & & & & \ddots \end{pmatrix} = G_{ij}(U) \qquad U = \begin{pmatrix} u_{00} & u_{01} \\ u_{10} & u_{11} \end{pmatrix}
$$

The Givens rotation $G_{ij}(\alpha, \beta)$ is the case where $U$ is the $2 \times 2$ unitary from the main idea. Here is the circuit for the example above; the boxes show $i$ and $j$ after step 2 and after step 3:

![Circuit on six qubits: CNOTs from bit 5 onto bits 1, 3, 4 and X gates, a multiply controlled U on bit 5 (the qubit on which the two strings differ) with X on bit 6, then the steps undone; equals G_ij(U). Boxed examples: i = 011100, j -> 011110 (agree); i -> 111101, j -> 111111](../../../assets/figures/L09-p11-2.png "w=732")

::pagebreak{lecture="9" page="12"}

Putting everything together, we can decompose any $n$-qubit unitary into Givens rotations, then decompose those into CNOT, $X$ and $C_{n-1}(U)$, then use extra workspace to decompose $C_{n-1}(U)$ into Toffoli and $C_1(U)$ (as in [Grover's algorithm](/notes/grover/#implementing-w)), and finally use the ABC decomposition.

![Diagram: any n-qubit unitary U decomposes into Givens rotations, which decompose into X, CNOT and C_{n-1}(U); C_{n-1}(U) decomposes (by using extra workspace) into Toffoli and C_1(U); Toffoli decomposes into CNOT and C_1(U); C_1(U) decomposes (ABC decomposition) into CNOT and Pauli rotations](../../../assets/figures/L09-p12-1.png "w=697")

Since a unitary matrix on $n$ qubits is of size $2^n \times 2^n$, we need roughly $4^n$ parameters to describe it. One- and two-qubit gates are of size $2\times 2$ and $4 \times 4$, so they contain at most 4 and 16 parameters, respectively. It is thus inevitable that in general we end up with roughly $4^n/16$ gates, which is exponential in $n$.

[^fix-1]: Corrected from the original notes, which say *a sequence of $4^n$ Givens rotations*. $4^n$ is an upper bound: zeroing every entry below the diagonal takes $2^n(2^n-1)/2$ rotations.
[^fix-2]: Corrected from the original notes, which have $i, j \in \{0,1\}$.

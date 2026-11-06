---
title: "Matrices and vectors"
description: "Matrices, basic matrix operations, vectors and matrix multiplication."
---
::pagesources{items="L02:1-5" exercises="/exercises/linear-algebra/#matrices-and-vectors"}

::source{lecture="2" pages="1"}

Quantum states form a **vector space**. Their transformations are **linear operators** on this space, studied in **linear algebra**. In quantum computing, all vector spaces are over $\C$ (unless stated otherwise). Informally, a vector space over $\C$ is a set of objects that can be added among themselves and multiplied by elements of $\C$.

## Matrices

::source{lecture="2" pages="1"}

An $n \times m$ matrix is an array of numbers:

$$
A = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1m} \\
a_{21} & a_{22} & \cdots & a_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nm}
\end{pmatrix}
$$

We write $A_{ij}$ to denote the entry in the $i$-th row and $j$-th column of $A$. Above: $A_{ij} = a_{ij}$. The set of all $n \times m$ complex matrices is denoted $M_{n,m}(\C)$.

## Basic matrix operations

::source{lecture="2" pages="2"}

$M_{n,m}(\C)$ is a vector space itself since matrices of the same shape can be added and multiplied by a constant (scalar). Both operations are performed entry-wise: for $A, B \in M_{n,m}(\C)$, $c \in \C$

- **addition**: $(A+B)_{ij} = A_{ij} + B_{ij}$
- **scalar multiplication**: $(cA)_{ij} = c A_{ij}$

$$
\begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix} + \begin{pmatrix} b_{11} & b_{12} \\ b_{21} & b_{22} \end{pmatrix} = \begin{pmatrix} a_{11}+b_{11} & a_{12}+b_{12} \\ a_{21}+b_{21} & a_{22}+b_{22} \end{pmatrix}
\qquad
c \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix} = \begin{pmatrix} ca_{11} & ca_{12} \\ ca_{21} & ca_{22} \end{pmatrix}
$$

To illustrate other basic operations, let

$$
A = \begin{pmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \end{pmatrix}.
$$

Then

- **complex conjugate**: $A^* = \bar{A} = \begin{pmatrix} a_{11}^* & a_{12}^* & a_{13}^* \\ a_{21}^* & a_{22}^* & a_{23}^* \end{pmatrix}$

  $$
  (A^*)_{ij} = (A_{ij})^*
  $$

- **transpose**: $A^\mathsf{T} = \begin{pmatrix} a_{11} & a_{21} \\ a_{12} & a_{22} \\ a_{13} & a_{23} \end{pmatrix}$

  $$
  (A^\mathsf{T})_{ij} = A_{ji}
  $$

- **conjugate transpose (adjoint)**:

  $$
  (A^\dagger)_{ij} = A_{ji}^* \qquad A^\dagger = (A^*)^\mathsf{T} = (A^\mathsf{T})^* = \begin{pmatrix} a_{11}^* & a_{21}^* \\ a_{12}^* & a_{22}^* \\ a_{13}^* & a_{23}^* \end{pmatrix}
  $$

Note: mathematicians often use $A^*$ to denote $A^\dagger$.

## Vectors

::source{lecture="2" pages="3"}

Vector is a matrix with only one row or column:

$$
\underbrace{(a_1 \;\; a_2 \;\; \cdots \;\; a_n)}_{\text{row vector}} \qquad \underbrace{\begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix}}_{\text{column vector}}
$$

Just like matrices, vectors of the same shape can be added and multiplied by scalars. They form a vector space $\C^n$.

## Vector multiplication

::source{lecture="2" pages="3"}

A row vector can be multiplied by a column vector with the same number of entries:

$$
(a_1 \;\; a_2 \;\; \cdots \;\; a_n) \cdot \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix} = a_1 b_1 + a_2 b_2 + \cdots + a_n b_n = \sum_{i=1}^n a_i b_i
$$

This is a special case of matrix multiplication.

## Matrix multiplication

::source{lecture="2" pages="4"}

Let $A$ be $n \times m$ and $B$ be $m \times l$ matrices. Then their product $C = A \cdot B$ is the $n \times l$ matrix with entries

$$
C_{ik} = \sum_{j=1}^m A_{ij} B_{jk}
$$

for all $i = 1, \dots, n$ and $k = 1, \dots, l$. Note that $C_{ik}$ is just the product of the $i$-th row of $A$ and the $k$-th column of $B$:

![Matrix multiplication: A is n by m, B is m by l, C is n by l; the i-th row of A and the k-th column of B are shaded and give the (i,k) entry of C](../../../assets/figures/L02-p04-1.png "w=484")

:::note
It is possible to multiply $A$ and $B$ only if the number of columns of $A$ agrees with the number of rows of $B$:

$$
[n \times \underbrace{m}_{\text{same!}}] \cdot [m \times l] = [n \times l]
$$
:::

## Properties of matrix multiplication

::source{lecture="2" pages="5"}

- **associativity**: $(AB)C = A(BC) = ABC$
- **distributivity**: $A(B+C) = AB + AC$

  $(A+B)C = AC + BC$
- **scalar multiplication**: $\lambda(AB) = (\lambda A)B = A(\lambda B) = (AB)\lambda$
- **complex conjugate**: $(AB)^* = A^* B^*$
- **transpose**: $(AB)^\mathsf{T} = B^\mathsf{T} A^\mathsf{T}$ (Reversed order!)
- **conjugate transpose**: $(AB)^\dagger = B^\dagger A^\dagger$

Note: matrix multiplication is **not** commutative: $AB \neq BA$.

---
title: "Eigenvalues and special matrices"
description: "Eigenvalues, diagonal representation, normal, Hermitian and unitary matrices."
polished: true
sources: [{"lecture":2,"pages":"11-12"}]
exercisesLink: "/exercises/linear-algebra/#eigenvalues-and-special-matrices"
---
## Eigenvalues and eigenvectors

An **eigenvector** of a square matrix $A \in M_{n,n}(\C)$ is a non-zero vector $\ket{v} \in \C^n$ that $A$ maps to a multiple of itself:

$$
A\ket{v} = \lambda\ket{v}
$$

The number $\lambda \in \C$ is called the **eigenvalue** corresponding to $\ket{v}$. The eigenvalues of $A$ are the roots of its **characteristic polynomial** $\det(A - \lambda I)$, that is, the solutions of

$$
\det(A - \lambda I) = 0
$$

where $\det$ denotes the determinant and

$$
I = \sum_{i=1}^n \ket{i}\!\bra{i} = \begin{pmatrix} 1 & & 0 \\ & \ddots & \\ 0 & & 1 \end{pmatrix}
$$

is the $n \times n$ **identity matrix**. Every $n \times n$ matrix has at least one eigenvalue.

## Diagonal representation

A square matrix $A \in M_{n,n}(\C)$ is **diagonalisable** if it can be written as

$$
A = \sum_{i=1}^n \lambda_i \ket{v_i}\!\bra{v_i}
$$

where $\ket{v_1}, \dots, \ket{v_n} \in \C^n$ is an orthonormal set of eigenvectors of $A$ with eigenvalues $\lambda_1, \dots, \lambda_n \in \C$.

To see what this means, apply $A$ to one of these eigenvectors, $\ket{v_j}$. Since $\braket{v_i|v_j} = \delta_{ij}$, only the term with $i = j$ survives:

$$
A\ket{v_j} = \sum_{i=1}^n \lambda_i \ket{v_i}\underbrace{\braket{v_i|v_j}}_{\delta_{ij}} = \lambda_j\ket{v_j}
$$

So $A$ multiplies each $\ket{v_j}$ by its eigenvalue $\lambda_j$. In other words, in the basis of its eigenvectors $A$ is the **diagonal** matrix

$$
\begin{pmatrix} \lambda_1 & & & \\ & \lambda_2 & & \\ & & \ddots & \\ & & & \lambda_n \end{pmatrix} = \mathrm{diag}(\lambda_1, \lambda_2, \dots, \lambda_n)
$$

## Normal, Hermitian and unitary matrices

A square matrix $A \in M_{n,n}(\C)$ is **normal** if it commutes with its conjugate transpose:

$$
A^\dagger A = A A^\dagger
$$

Normal matrices are exactly the diagonalisable ones:

:::theorem[Theorem (p.72 of Nielsen & Chuang)]
A matrix is diagonalisable if and **only** if it is normal.
:::

Here "diagonalisable" has the meaning above: the eigenvectors must be orthonormal.

Two important kinds of normal matrices are Hermitian and unitary matrices, defined below. A matrix can be both:

![Venn diagram: Unitary and Hermitian overlapping circles, both inside Normal](../../../assets/figures/L02-p12-1.png "w=252")

A square matrix $A \in M_{n,n}(\C)$ is **Hermitian** if it equals its own conjugate transpose:

$$
A = A^\dagger
$$

Such a matrix is clearly normal, since both sides of $A^\dagger A = A A^\dagger$ equal $A^2$. Hence it is diagonalisable. A normal matrix is Hermitian if and only if all its eigenvalues are real.

A square matrix $A \in M_{n,n}(\C)$ is **unitary** if

$$
A A^\dagger = A^\dagger A = I
$$

where $I$ is the $n \times n$ identity matrix. You have seen this condition before: for $2 \times 2$ matrices it is exactly the condition on a [general qubit operation](/notes/qubits/#general-qubit-operation) from Lecture 1.

$$
\begin{pmatrix} \bar{a} & \bar{b} \\ \bar{c} & \bar{d} \end{pmatrix} \cdot \begin{pmatrix} a & c \\ b & d \end{pmatrix} = \begin{pmatrix} \overbrace{\abs{a}^2 + \abs{b}^2}^{1} & \bar{a}c + \bar{b}d \\ \underbrace{a\bar{c} + b\bar{d}}_{0} & \underbrace{\abs{c}^2 + \abs{d}^2}_{1} \end{pmatrix}
$$

Unitary matrices are normal and therefore diagonalisable. All eigenvalues of a unitary operator have absolute value 1. Unitary operators also preserve inner products: if $U$ is unitary, then

$$
\left.\begin{aligned} \ket{a'} &= U\ket{a} \\ \ket{b'} &= U\ket{b} \end{aligned}\right\} \Rightarrow \braket{a'|b'} = (U\ket{a})^\dagger (U\ket{b}) = \bra{a}U^\dagger U\ket{b} = \braket{a|b}
$$

In particular, taking $\ket{a} = \ket{b}$ shows that they preserve norms, so they map unit vectors to unit vectors.

Any unitary matrix $U$ is of the form $U = e^{iH}$ for some Hermitian matrix $H$. So you can think of Hermitian matrices as the matrix version of real numbers, and unitary matrices as the matrix version of complex numbers $e^{i\varphi}$ with $\varphi \in \R$. Their eigenvalues fit this picture: Hermitian matrices have real eigenvalues, and unitary matrices have eigenvalues of absolute value 1, just like $e^{i\varphi}$.

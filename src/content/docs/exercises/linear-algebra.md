---
title: "Exercises: Linear algebra"
description: "Exercises on matrices, Dirac notation, eigenvalues and the tensor product."
---
::pagesources{label="Exercise sheets:" items="E02:1-2"}

## Matrices and vectors

::pagesources{label="Notes:" notes="/notes/matrices-and-vectors/"}

### Properties of matrix multiplication

::source{sheet="2" exercise="3" pages="1"}

The goal of this exercise is to verify some basic properties of matrix multiplication.

1. Let $A = \ketbra{i}{j}$, $B = \ketbra{k}{l}$, $C = \ketbra{s}{t}$, for some $i,j,k,l,s,t \in \{1,\dots,n\}$, be three standard basis matrices. Verify that

   $$
   (AB)C = A(BC).
   $$

   Why does this imply the same equation for all complex matrices $A, B, C \in \mathrm{M}_{n,n}(\mathbb{C})$?

2. Let $A = \ketbra{i}{j}$ and $B = \ketbra{k}{l}$, for some $i,j,k,l \in \{1,\dots,n\}$, be two standard basis matrices. Verify that

   $$
   (AB)^\mathsf{T} = B^\mathsf{T} A^\mathsf{T}.
   $$

   Why does this imply the same equation for all complex matrices $A, B \in \mathrm{M}_{n,n}(\mathbb{C})$?

## Dirac notation, inner products and bases

::pagesources{label="Notes:" notes="/notes/dirac-notation/"}

### Bra-ket notation

::source{sheet="2" exercise="1" pages="1"}

Let $A$ be an $n \times n$ matrix given in the computational basis and let $\bra{i}$ denote the $i$-th standard basis row vector and $\ket{j}$ denote the $j$-th standard basis column vector. Show that

1. $\bra{i}A$ is the $i$-th row of $A$,
2. $A\ket{j}$ is the $j$-th column of $A$,
3. $\bra{i}A\ket{j} = A_{ij}$, the $(i,j)$-th entry of $A$.

Let $A = \sum_{k=1}^n \ket{\psi_k}\bra{k}$, for some vectors $\ket{\psi_k} \in \mathbb{C}^n$. In terms of these vectors,

4. what is $A\ket{j}$ equal to,
5. what is $\bra{i}A\ket{j}$ equal to?

### Properties of the inner product

::source{sheet="2" exercise="2" pages="1"}

Verify that the inner product $\braket{u|v}$ on $\mathbb{C}^n$ satisfies the following two properties:

1. $\braket{u|v} = \left(\braket{v|u}\right)^\dagger = \overline{\braket{v|u}}$,
2. $\braket{u|u} \ge 0$ and $\braket{u|u} = 0$ iff $\ket{u} = \mathbf{0}$ (the all-zeroes vector).

## Eigenvalues and special matrices

::pagesources{label="Notes:" notes="/notes/eigenvalues-and-special-matrices/"}

### Types of matrices

::source{sheet="2" exercise="4" pages="2"}

Consider the following five matrices:

$$
A = \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix},\quad
B = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix},\quad
C = \begin{pmatrix} 1 & 0 \\ 0 & i \end{pmatrix},\quad
D = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix},\quad
E = \begin{pmatrix} 2 & 0 \\ 0 & i \end{pmatrix}.
$$

Match them with the five points in this diagram:

![Venn-style diagram: a large ellipse labelled Normal containing two overlapping circles labelled Unitary and Hermitian; five dots: one in Normal outside both circles on the upper right, one in Normal at the top on the boundary region above the overlap, one in Unitary only, one in the overlap, one in Hermitian only](../../../assets/figures/E02-p02-1.png "w=391")

### Diagonalizing Y

::source{sheet="2" exercise="5" pages="2"}

The goal of this exercise is to diagonalize $Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$.

1. Find the eigenvalues $\lambda_1, \lambda_2$ of $Y$.
2. Find corresponding eigenvectors $\ket{v_1}, \ket{v_2}$ (of unit length) of $Y$.
3. Verify that $Y = \lambda_1\ketbra{v_1}{v_1} + \lambda_2\ketbra{v_2}{v_2}$.

### Eigenvalues, eigenvectors, and diagonalisation

::source{sheet="2" exercise="6" pages="2"}

Let $A \in \mathrm{M}_{n,n}(\mathbb{C})$ be a normal matrix and $A = \sum_k \lambda_k\ketbra{v_k}{v_k}$ be its diagonal form (also known as "spectral decomposition" of $A$). Recall that here $\lambda_k$ are the eigenvalues of $A$ and $\ket{v_k}$ are the eigenvectors of $A$, and that the eigenvectors are orthonormal: $\braket{v_i|v_j} = \delta_{ij}$.

1. Show that $\lambda_k \in \mathbb{R}$ for all $k$ if and only if $A$ is Hermitian and that $|\lambda_k| = 1$ for all $k$ if and only if $A$ is unitary.
2. What is the spectral decomposition of $A^2 \equiv A \cdot A$?
3. Show that the matrix $\exp(A) \equiv \sum_{n=0}^\infty A^n/n!$ has spectral decomposition $\sum_k e^{\lambda_k}\ketbra{u_k}{u_k}$. Show that $\exp(-iA)$ is unitary if $A$ is Hermitian.
4. Assume $A$ is Hermitian and unitary. What are the eigenvalues of $A$? How does $A^2$ look like?

## Tensor product

::pagesources{label="Notes:" notes="/notes/tensor-product/"}

### Tensor product

::source{sheet="2" exercise="7" pages="2"}

Let $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$ and $M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$. Compute explicitly the $4 \times 4$ matrices $I \otimes M$ and $M \otimes I$.

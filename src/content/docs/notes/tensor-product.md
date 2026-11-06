---
title: "Tensor product"
description: "The tensor (Kronecker) product of vectors and matrices."
---
::pagesources{items="L02:13" exercises="/exercises/linear-algebra/#tensor-product"}

## Tensor product

::source{lecture="2" pages="13"}

Let $A$ and $B$ be matrices of arbitrary shape. Their **tensor product** (or **Kronecker product**) is the following block matrix:

$$
A \otimes B = \begin{pmatrix} A_{11}B & A_{12}B & \cdots & A_{1m}B \\ A_{21}B & A_{22}B & \cdots & A_{2m}B \\ \vdots & \vdots & \ddots & \vdots \\ A_{n1}B & A_{n2}B & \cdots & A_{nm}B \end{pmatrix}
$$

where the block at coordinates $(i,j)$ is equal to $A_{ij}B$. If $A$ is $n \times m$ and $B$ is $n' \times m'$ then $A \otimes B$ is $nn' \times mm'$.

Tensor product applies also to vectors: $\ket{\psi} \otimes \ket{\varphi}$ and $\bra{\psi} \otimes \bra{\varphi}$. Note: We abbreviate these as $\ket{\psi}\ket{\varphi}$ and $\bra{\psi}\bra{\varphi}$.

You can also mix vectors and matrices. For example: $\bra{0} \otimes I$ and $I \otimes \ket{\psi}$.

Some elementary properties of the tensor product:

- **associativity**: $(A \otimes B) \otimes C = A \otimes (B \otimes C) = A \otimes B \otimes C$
- **distributivity**: $A \otimes (B + C) = A \otimes B + A \otimes C$

  $(A + B) \otimes C = A \otimes C + B \otimes C$
- **scalar multiplication**: $\lambda(A \otimes B) = (\lambda A) \otimes B = A \otimes (\lambda B)$

Tensor product interacts nicely with matrix multiplication. Whenever the matrix sizes are such that $A_1 A_2$ and $B_1 B_2$ make sense, then

$$
(A_1 \otimes B_1) \cdot (A_2 \otimes B_2) = (A_1 A_2) \otimes (B_1 B_2).
$$

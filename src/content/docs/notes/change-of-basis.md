---
title: "Change of basis and measurement"
description: "Expressing states and matrices in a different basis, and measuring in any orthonormal basis."
polished: true
sources: [{"lecture":3,"pages":"5-7"}]
exercisesLink: "/exercises/postulates/#change-of-basis-and-measurement"
---
## Expressing a state in a different basis

Any $\ket{\psi} \in \C^n$ can be expressed in the standard basis:

$$
\ket{\psi} = \begin{pmatrix} \alpha_1 \\ \vdots \\ \alpha_n \end{pmatrix} = \sum_{i=1}^n \alpha_i \ket{i} = \sum_{i=1}^n \braket{i|\psi} \ket{i}
$$

where $\alpha_i := \braket{i|\psi}$ is the $i$-th coordinate of $\ket{\psi}$ (in the standard basis). Similarly, if $\ket{b_1}, \dots, \ket{b_n}$ is any [orthonormal basis](/notes/dirac-notation/#basis) of $\C^n$, then

$$
\ket{\psi} = \sum_{j=1}^n \braket{b_j|\psi} \ket{b_j}
$$

where $\braket{b_j|\psi}$ is the $j$-th coordinate of $\ket{\psi}$ in the basis $\ket{b_1}, \dots, \ket{b_n}$. This means that we can express $\ket{\psi}$ in two different ways:

$$
\ket{\psi} = \sum_{i=1}^n \underbrace{\braket{i|\psi}}_{\alpha_i} \ket{i} = \sum_{j=1}^n \underbrace{\braket{b_j|\psi}}_{\beta_j} \ket{b_j}
$$

for some $\alpha_i, \beta_j \in \C$. How are $\alpha_i$ and $\beta_j$ related? If we left-multiply both sides by $\bra{i}$, we get

$$
\alpha_i = \sum_{j=1}^n \beta_j \underbrace{\braket{i|b_j}}_{M_{ij}} = \sum_{j=1}^n M_{ij} \beta_j
$$

where $M_{ij} = \braket{i|b_j}$. In other words, $\begin{pmatrix} \alpha_1 \\ \vdots \\ \alpha_n \end{pmatrix} = M \begin{pmatrix} \beta_1 \\ \vdots \\ \beta_n \end{pmatrix}$, where $M$ is the matrix with entries $M_{ij}$. To simplify $M$, move the number $\braket{i|b_j}$ between $\ket{i}$ and $\bra{j}$, and use $\sum_{i=1}^n \ketbra{i}{i} = I$:

$$
M = \sum_{i,j=1}^n M_{ij} \ketbra{i}{j} = \sum_{i,j=1}^n \braket{i|b_j} \cdot \ketbra{i}{j} = \underbrace{\sum_{i=1}^n \ketbra{i}{i}}_{I} \cdot \sum_{j=1}^n \ket{b_j}\!\bra{j} = \sum_{j=1}^n \ketbra{b_j}{j} .
$$

Note that $M$ is unitary, since

$$
M^\dagger M = \sum_{j,k=1}^n \ket{j} \underbrace{\braket{b_j|b_k}}_{\delta_{jk}} \bra{k} = \sum_{k=1}^n \ketbra{k}{k} = I .
$$

Writing $\ket{\alpha}$ and $\ket{\beta}$ for the two coordinate vectors above, we have $\ket{\alpha} = M\ket{\beta}$, so $M^\dagger\ket{\alpha} = \ket{\beta}$. Thus the matrix $M^\dagger$, that is,

$$
\boxed{U = \sum_{j=1}^n \ketbra{j}{b_j}}
$$

is the basis change from the standard basis $\ket{1}, \dots, \ket{n}$ to the basis $\ket{b_1}, \dots, \ket{b_n}$.

## Expressing a matrix in a different basis

We can apply $U = \sum_{i=1}^n \ketbra{i}{b_i}$ to go from the standard basis $\ket{i}$ to $\ket{b_i}$. This way we can express a given vector in a different basis.

Similarly, given a matrix $A \in M_{n,n}(\C)$ with entries $A_{ij} = \braket{i|A|j}$, how can we find the matrix $B \in M_{n,n}(\C)$ with entries $B_{ij} = \braket{b_i|A|b_j}$, that is, the entries of $A$ in the basis $\ket{b_1}, \dots, \ket{b_n}$? Note that

$$
B = \sum_{i,j=1}^n B_{ij} \ketbra{i}{j} = \sum_{i,j=1}^n \ket{i}\braket{b_i|A|b_j}\bra{j} = UAU^\dagger,
$$

where $U$ is the same basis change unitary as before: the sum over $i$ gives $U$ on the left of $A$, and the sum over $j$ gives $U^\dagger = \sum_{j=1}^n \ketbra{b_j}{j}$ on the right.

## Measurement in a different basis

The [measurement postulate](/notes/postulates/#quantum-rules-of-the-game) describes a measurement in the standard basis. More generally, we can measure a state $\ket{\psi} \in \C^n$ in any orthonormal basis $\ket{b_1}, \dots, \ket{b_n}$ of $\C^n$. Such a measurement produces outcome $i \in \{1, \dots, n\}$ with probability $\abs{\braket{b_i|\psi}}^2$, and the corresponding post-measurement state is $\ket{b_i}$.

Note that this is equivalent to applying $U = \sum_{i=1}^n \ketbra{i}{b_i}$, performing the standard basis measurement and then applying $U^\dagger$. This works because $U\ket{\psi}$ has entries $\braket{b_i|\psi}$ (it is the coordinate vector $\ket{\beta}$ from above), and $U^\dagger$ maps $\ket{i}$ to $\ket{b_i}$. A measurement in an orthonormal basis is called an **orthogonal measurement**.

::pagebreak{lecture="3" page="7"}

:::example
If you measure

$$
\ket{+} = \frac{1}{\sqrt{2}}\left(\ket{0} + \ket{1}\right) \quad\text{and}\quad \ket{-} = \frac{1}{\sqrt{2}}\left(\ket{0} - \ket{1}\right)
$$

in the standard basis, you get each of the two outcomes with probability $\frac{1}{2}$, so for this measurement the two states appear indistinguishable. Of course, this is not the best measurement to try! You should instead map them to the standard basis by applying the basis change $U$ for the basis $\ket{+}, \ket{-}$,

$$
H = \ketbra{0}{+} + \ketbra{1}{-} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 0 & 0 \end{pmatrix} + \frac{1}{\sqrt{2}}\begin{pmatrix} 0 & 0 \\ 1 & -1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}
$$

and then measure. This way you are simply trying to discriminate between $\ket{0}$ and $\ket{1}$, which you can do perfectly. Alternatively, since $\ket{+}$ and $\ket{-}$ form an orthonormal basis, you can directly measure in this basis to perfectly discriminate these states. More generally, you can perfectly discriminate any orthonormal set of states by simply measuring in the corresponding basis.
:::

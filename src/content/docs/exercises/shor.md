---
title: "Exercises: Fourier transform and Shor's algorithm"
description: "Exercises on phase estimation, the quantum Fourier transform, and factoring via period finding."
sources: [{"sheet":10,"pages":"1-2"},{"sheet":11,"pages":"1-2"}]
---
## Quantum phase estimation

::pagesources{label="Notes:" notes="/notes/phase-estimation/"}

### Cirq: Phase estimation

::extag{sheet="11" exercise="5"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

## Quantum Fourier transform

::pagesources{label="Notes:" notes="/notes/fourier-transform/"}

### QFT on 1 and 2 qubits

::extag{sheet="10" exercise="1"}

Recall that the matrix entries of the $M \times M$ quantum Fourier transform QFT are

$$
\mathrm{QFT}_{jk} = \omega^{jk}/\sqrt{M}
$$

where $\omega = \exp(2\pi i/M)$ and $j, k \in \{0, \dots, M-1\}$. Write down the matrix corresponding to the quantum Fourier transform on

1. one qubit,

2. two qubits.

### Quantum circuit for QFT on 2 qubits

::extag{sheet="10" exercise="2"}

The goal of this exercise is to better understand the quantum Fourier transform on two qubits.

1. You saw the circuit for the 4-qubit quantum Fourier transform in the class. Draw the 2-qubit version of this circuit for the 2-qubit QFT.

2. Using this circuit, verify that

   $$
   \mathrm{QFT}\ket{b_1 b_2} = \frac{1}{2}\big(\ket{0} + (-1)^{b_2}\ket{1}\big) \otimes \big(\ket{0} + (-1)^{b_1} i^{b_2}\ket{1}\big).
   $$

3. Verify that this agrees with the 2-qubit QFT matrix you obtained in the previous exercise.

### Roots of unity

::extag{sheet="10" exercise="3"}

Let $\omega = \exp(2\pi i/M)$ be the $M$-th root of unity.

1. Show that $\displaystyle\sum_{k=0}^{M-1} \omega^k = 0$.

2. Show that $\displaystyle\sum_{k=0}^{M-1} \omega^{ak} = M$ if $a \equiv 0 \pmod{M}$.

3. Show that $\displaystyle\sum_{k=0}^{M-1} \omega^{ak} = 0$ if $a \not\equiv 0 \pmod{M}$.

*Hint:* You can prove the first identity by contradiction: assume the sum is not 0 and multiply both sides by $\omega$ to get a contradiction. Alternatively, you can use the formula for the sum of the first $n$ terms in a geometric progression: if $x \neq 1$ then $\sum_{k=0}^{n-1} x^k = (1 - x^n)/(1 - x)$.

### Unitarity of QFT

::extag{sheet="10" exercise="4"}

Let QFT denote the $M \times M$ quantum Fourier transform. Recall that $\mathrm{QFT}_{jk} = \omega^{jk}/\sqrt{M}$ where $\omega = \exp(2\pi i/M)$ and $j, k \in \{0, \dots, M-1\}$. Write down an expression for the matrix entry $(\mathrm{QFT}^\dagger)_{kl}$ and verify that QFT is unitary.

### Product representation of the QFT output

::extag{sheet="10" exercise="5"}

Note that any number $b \in [0, 1)$ that is of the form $a/2^n$, for some $a \in \{0, \dots, 2^n - 1\}$, can be uniquely expressed as

$$
b = \sum_{i=1}^{n} b_i 2^{-i},
$$

for some coefficients $b_1, \dots, b_n \in \{0, 1\}$. In fact, $0.b_1 b_2 \dots b_n$ is simply the binary representation of $b$ and $b_k$ is the $k$-th digit of this representation.

For any $j \in \{1, \dots, n\}$, let $0.b_j b_{j+1} \dots b_n \in [0, 1)$ be a real number whose binary representation agrees with the last binary digits of $b$.

1. Show that $0.b_j b_{j+1} \dots b_n$ is the binary representation of the fractional part of $2^{j-1} b$ (this is the part that comes after the point in the binary expansion).

Let $\beta_j = \exp(2\pi i\, 0.b_j b_{j+1} \dots b_n) \in \mathbb{C}$ be a complex number whose phase is $2\pi \cdot 0.b_j b_{j+1} \dots b_n$.

2. Show that $\beta_{n+1-k} = \exp(2\pi i b 2^{n-k})$.

Recall that the $n$-qubit quantum Fourier transform is given by the following $2^n \times 2^n$ matrix:

$$
\mathrm{QFT} = \frac{1}{\sqrt{2^n}} \sum_{a,b=0}^{2^n - 1} \omega^{ab} \ketbra{a}{b}
$$

where $\omega = \exp(2\pi i/2^n)$. The rest of this exercise is about proving the following identity:

$$
\mathrm{QFT}\ket{b_1 b_2 \dots b_n} = \frac{1}{\sqrt{2^n}} \big(\ket{0} + \beta_n \ket{1}\big) \otimes \big(\ket{0} + \beta_{n-1}\ket{1}\big) \otimes \cdots \otimes \big(\ket{0} + \beta_1 \ket{1}\big).
\tag{1}
$$

It can be proved by showing that the vectors on both sides agree entry-wise. For this, it suffices to left-multiply both sides with $\bra{a_1 a_2 \dots a_n}$ and compare the results. If you get the same result for all $a_1, a_2, \dots, a_n \in \{0, 1\}$ then all $2^n$ entries agree and hence eq. (1) holds.

3. Show that the resulting entry on the left-hand side of eq. (1) is $\omega^{ab}/\sqrt{2^n}$.

4. Show that the resulting entry on the right-hand side of eq. (1) is $\frac{1}{\sqrt{2^n}} \prod_{k=1}^{n} \beta_{n+1-k}^{a_k}$.

5. Simplify this expression and show that both sides are equal.

### Cirq: Quantum Fourier transform

::extag{sheet="11" exercise="4"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

## Number theory toolkit

::pagesources{label="Notes:" notes="/notes/number-theory/"}

### Euclidean algorithm

::extag{sheet="11" exercise="1"}

Recall that the greatest common divisor $\gcd(a, b)$ of integers $a$ and $b$ is the largest positive integer that divides both $a$ and $b$. Assuming (without loss of generality) that $a \geq b$, note that

$$
\gcd(a, b) = \gcd(a - b, b).
$$

More generally, you can subtract any multiple of the smallest number from the biggest number without affecting the value of their gcd:

$$
\gcd(a, b) = \gcd(a - mb, b),
$$

for any $m \geq 0$. To decrease the bigger number by as much as possible, it is useful to choose $m$ as big as possible while still making sure that $a - mb \geq 0$. This corresponds to $m = \lfloor a/b \rfloor$ (or `m = a//b` in Python). With this choice $a - mb$ is the remainder of $a$ modulo $b$ (or `a % b` in Python). You can thus find the gcd by repeatedly replacing the largest number by itself modulo the smallest one. This is exactly how the Euclidean algorithm works.

1. Let $a = 210$ and $b = 91$. Compute $d = \gcd(a, b)$.

2. Find integers $x$ and $y$ that satisfy the Bézout's identity

   $$
   ax + by = d
   \tag{1}
   $$

   using the extended Euclidean algorithm (it is similar to the regular Euclidean algorithm, but you also have to keep track of the quotients `a//b` at all steps).

### Multiplicative inverse and order

::extag{sheet="11" exercise="2"}

Let $\alpha = a/d$ and $\beta = b/d$, where $a, b, d$ are the values from the previous exercise. Note that $\gcd(\alpha, \beta) = 1$, i.e., $\alpha$ and $\beta$ are relatively prime.

1. Find the modular multiplicative inverse of $\beta$ modulo $\alpha$, i.e., find an integer $y$ such that

   $$
   \beta y \equiv 1 \pmod{\alpha}.
   $$

   *Hint:* Divide both sides of eq. (1) by $d$ and then take them modulo $\alpha$.

2. Determine the multiplicative order of $\beta$ modulo $\alpha$, i.e., find the smallest $r \geq 1$ such that

   $$
   \beta^r \equiv 1 \pmod{\alpha}.
   $$

   You can do this by computing

   $$
   \beta^k \pmod{\alpha},
   $$

   for $k = 0, 1, 2, \dots$, until you get 1.

::pagebreak{sheet="11" page="2"}

3. Determine the modular multiplicative inverse of 19 modulo $\alpha$.

## Factoring via order finding

::pagesources{label="Notes:" notes="/notes/factoring/"}

### Using order finding to factor

::extag{sheet="11" exercise="3"}

Your goal is to factor $N = 21$ using order finding. Assume the random number $a \in \{2, \dots, N-1\}$ you picked in the first step of the algorithm is:

1. $a = 7$,

2. $a = 10$.

Go through the remaining steps of the algorithm and determine the factors of $N$. (You can use a calculator or a computer to compute gcd and to find orders modulo $N$.)

### Cirq (bonus): Order finding

::extag{sheet="11" exercise="6"}

:::note[Programming exercise]
This is a Cirq exercise; see [how the programming exercises work](/exercises/#programming-exercises).
:::

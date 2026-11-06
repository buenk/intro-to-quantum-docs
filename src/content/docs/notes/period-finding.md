---
title: "Period finding"
description: "The quantum algorithm for period finding."
---
::pagesources{items="L11:7-11"}

## Period finding

::source{lecture="11" pages="7"}

Let us consider the more general problem of finding the period of some arbitrary function $f : \mathbb{N} \to \{0, \dots, N-1\}$ which is promised to be periodic, i.e., there is some $r \geq 1$ such that

$$
f(x + r) = f(x) \qquad \forall x.
$$

We have the ability to evaluate this function in superposition on any input.

In the case of $f_a$, we can use a reversible classical circuit for implementing $a^x$ (this can be done using repeated squaring and integer multiplication based on the binary digits of $x$). More generally, we can imagine having an oracle $U_f$ for computing $f$ and work from there.

## Algorithm

::source{lecture="11" pages="8-11"}

Let $f : \{0,1\}^n \to \{0,1\}^n$ (truncate $\mathbb{N}$ to $n$ bits; $N = 2^n$) and $U_f$ be its bit oracle

![Circuit: box $U_f$ with inputs $\ket{x}$, $\ket{y}$ (each an n-qubit register) and outputs $\ket{x}$, $\ket{y \oplus x}$](../../../assets/figures/L11-p08-0.png "w=342")

The quantum circuit is just like for Simon's algorithm, but with the second Hadamard transform $H^{\otimes n}$ replaced by $\text{QFT}^\dagger$. It is also identical to the phase estimation circuit.

![Circuit: first register $\ket{0^n}$ goes through $H^{\otimes n}$, then $U_f$, then $\text{QFT}^\dagger$, then a measurement giving $z \in \{0,1\}^n$; second register $\ket{0^n}$ goes into $U_f$ and the output is measured and discarded. Points along the circuit are labelled 1 to 6.](../../../assets/figures/L11-p08-1.png "w=757")

1. $\ket{0^n}\ket{0^n}$
2. $\ket{+}^{\otimes n}\ket{0^n}$
3. $\underbrace{\dfrac{1}{\sqrt{2^n}} \displaystyle\sum_{x=0}^{2^n-1} \ket{x}\ket{f(x)}}_{\text{the uniform superposition over all } x \text{ and the corresponding } f(x)}$
4. Let $y_0 \in \{0,1\}^n$ be the measurement outcome when measuring the 2nd register. The post-measurement state is

$$
\left( \frac{1}{\sqrt{m}} \sum_{k=0}^{m-1} \ket{x_0 + kr} \right) \ket{y_0}
$$

![Plot of f(x) against x: a sawtooth function with period r; the points x_0, x_0+r, x_0+2r, ... where f(x) = y_0 are marked on the x-axis up to 2^n - 1](../../../assets/figures/L11-p08-2.png "w=323")

where

- $x_0 \in \{0, \dots, N-1\}$ is the least value s.t. $f(x_0) = y_0$,
- $r \in \{1, \dots, N-1\}$ is the period of $f$,
- $m = \lfloor 2^n / r \rfloor$ is the number of $x$ s.t. $f(x) = y_0$.

The state in the first register has periodic structure while $y_0$ itself is not useful for determining $r$.

::pagebreak{lecture="11" page="9"}

4. $\dfrac{1}{\sqrt{m}} \displaystyle\sum_{k=0}^{m-1} \ket{x_0 + kr}$
5. Recall that, for any $x \in \{0, \dots, 2^n-1\}$,

$$
\text{QFT}^\dagger \ket{x} = \frac{1}{\sqrt{2^n}} \sum_{z=0}^{2^n-1} \omega^{-xz} \ket{z}
$$

where $\omega = \exp(2\pi i / 2^n)$. Applying this on the state from the previous step gives

$$
\begin{aligned}
\frac{1}{\sqrt{m}} \sum_{k=0}^{m-1} \text{QFT}^\dagger \cdot \ket{x_0 + kr}
&= \frac{1}{\sqrt{m}} \sum_{k=0}^{m-1} \frac{1}{\sqrt{2^n}} \sum_{z=0}^{2^n-1} \omega^{-(x_0 + kr)z} \ket{z} \\
&= \sum_{z=0}^{2^n-1} \omega^{-x_0 z} \frac{1}{\sqrt{m}} \cdot \frac{1}{\sqrt{2^n}} \left( \sum_{k=0}^{m-1} \omega^{-krz} \right) \ket{z}
\end{aligned}
$$

6. The probability of observing outcome $z \in \{0,1\}^n$ in the final measurement is just the $|\cdot|^2$ of the amplitude in front of $\ket{z}$:

$$
p(z) = \frac{1}{m 2^n} \left| \sum_{k=0}^{m-1} \omega^{-krz} \right|^2
$$

The plot of $p(z)$, for $z \in \{0, \dots, 2^n-1\}$, looks something like this. It has $r$ peaks, each of height roughly $1/r$, located at integer multiples of $2^n/r$. Indeed, note that $\omega^{-krz} = \exp(-2\pi i\, krz / 2^n)$, so if $z = \ell \cdot 2^n/r$, for some $\ell \in \mathbb{Z}$, then $2\pi i\, krz/2^n = 2\pi i\, k\ell$ and $\omega^{-krz} = 1$ and $p(z) = \frac{1}{m 2^n} \cdot m^2 = m/2^n \simeq 1/r$ since $m = \lfloor 2^n/r \rfloor$. How do we recover $r$ from the measurement outcome $z$?

![Plot of p(z) for z from 0 to 2^n: r sharp peaks of height 1/r at z = 0, 2^n/r, 2·2^n/r, ..., (r-1)·2^n/r](../../../assets/figures/L11-p09-1.png "w=514")

::pagebreak{lecture="11" page="10"}

The general procedure involves finding a continued fraction expansion for $z/2^n$. Just to get the main idea, let us consider the very special case when the period $r$ itself is a power of 2: $r = 2^u$, for some $u \in \{0, \dots, n\}$. Then

$$
m = \lfloor 2^n / r \rfloor = \lfloor 2^{n-u} \rfloor = 2^{n-u} = 2^n / r \tag{*}
$$

and the probability to get measurement outcome $z = \ell \cdot 2^n/r$ is exactly $1/r$ for all $\ell \in \{0, \dots, r-1\}$ since

$$
\begin{aligned}
p(z) &= \frac{1}{m 2^n} \left| \sum_{k=0}^{m-1} \omega^{-krz} \right|^2 \\
&= \frac{1}{m 2^n} \left| \sum_{k=0}^{m-1} \exp\left( -\frac{2\pi i}{2^n} \cdot kr \cdot \ell \cdot \frac{2^n}{r} \right) \right|^2 \\
&= \frac{1}{m 2^n} \left| \sum_{k=0}^{m-1} \underbrace{\exp(-2\pi i \cdot k \cdot \ell)}_{1} \right|^2 \\
&= \frac{1}{m 2^n} \cdot m^2 = \frac{m}{2^n} = 1/r \qquad \text{by } (*).
\end{aligned}
$$

Hence we do not get any other outcomes than $z = \ell \cdot 2^n/r$ for some $\ell \in \{0, \dots, r-1\}$. To estimate $r$ from such $z$, note that $z/2^n \in [0,1)$ is given by

$$
z/2^n = \ell/r = \ell/2^u
$$

since we assumed that $r = 2^u$. Since $\ell \in \{0, \dots, r-1\}$ is uniformly random, with probability $1/2$ it is odd so the binary expansion of $z/2^n = \ell/2^u$ looks as follows:

$$
\ell/2^u = 0.\overbrace{\underbrace{1011}_{u \text{ bits}}00\dots0}^{n \text{ bits}}
$$

where the last non-zero bit is at position $u$. From this $u$ we can infer $r$ since $r = 2^u$. The case of a general $r$ is more complicated and requires a continued fraction expansion for $z/2^n$.

::pagebreak{lecture="11" page="11"}

Another way to think about it, which does not use period finding but directly connects to phase estimation:

$$
U\ket{x} = \ket{ax \bmod N}
$$

is a permutation matrix, so it is diagonal in the Fourier basis and its eigenvalues are of the form $\exp(2\pi i\, k/\ell)$ where $\ell$ is the length of some cycle. In particular, $U\ket{1} = \ket{a}$, $U\ket{a} = \ket{a^2}$, etc. is the cycle that goes through all powers of $a$, so the corresponding eigenvalue is $e^{2\pi i / r}$ where $r$ is the order of $a$ modulo $N$.

We can get $r$ by running phase estimation on $\ket{1}$ (which is not an eigenvector itself, but has overlap $1/r$ with all eigenvectors, such as the one that is a uniform superposition of all powers of $a$).

Note that $\displaystyle\sum_{i=0}^{2^n-1} \ketbra{i}{i} \otimes U^i$ is the bit oracle for $f_a(x) = a^x \pmod N$, so that's why the algorithm is the way it is and we are literally just using phase estimation.

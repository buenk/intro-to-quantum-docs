---
title: "Factoring via order finding"
description: "The factoring and order finding problems, and how to factor using order finding."
polished: true
sources: [{"lecture":11,"pages":"4-7"}]
exercisesLink: "/exercises/shor/#factoring-via-order-finding"
---
## Factoring and order finding problems

In the **factoring** problem, we assume that $N = pq$, where $p$ and $q$ are odd primes (the general case can be handled with a little more effort).

- Input: $N$
- Output: $p$ and $q$

In the **order finding** problem, we assume that $N \geq 2$ is an integer and $a \in \{2, \dots, N-1\}$ is such that $\gcd(N,a) = 1$.

- Input: $a$ and $N$
- Output: the smallest integer $r \geq 1$ such that $a^r \equiv 1 \pmod N$, that is, the [order](/notes/number-theory/#multiplicative-order) of $a$ modulo $N$.

## How to factor using order finding

In the algorithm below, $a \in_R S$ means that $a$ is chosen at random from the set $S$.

**Factor**$(N)$:

```
a ∈_R {2, ..., N-1}
g = gcd(N, a)
if g ≠ 1
    return (g, N/g)       # we were extremely lucky and guessed a factor
else
    r = Order(a, N)       # call the quantum subroutine for order finding
    if r is even, let x = a^{r/2} else restart
    if x + 1 ≢ 0 (mod N)
        return (gcd(N, x+1), gcd(N, x-1))
    else restart
```

For the analysis of the algorithm, we use the following fact:

:::theorem[Fact]
If $N = pq$ and $a \in_R \{2, \dots, N-1\}$ is such that $\gcd(N,a) = 1$ then with probability $> 1/2$

- $\text{Order}(a,N)$ is even AND
- $a^{r/2} + 1 \not\equiv 0 \pmod N$
:::

In other words, each run fails and has to restart with probability $< 1/2$. If we try $k$ times, all $k$ attempts fail with probability $< 2^{-k}$, which is extremely small.

If we make it to the very end, why are

$$
\gcd(N, x+1) \quad \text{and} \quad \gcd(N, x-1)
$$

the factors of $N$?

::pagebreak{lecture="11" page="6"}

Let $N = pq$, where $p$ and $q$ are odd primes, and assume we guessed an $a \in \{2, \dots, N-1\}$ such that

- $r = \text{Order}(a, N)$ is even AND
- $a^{r/2} + 1 \not\equiv 0 \pmod N$.

Let $x = a^{r/2}$. Since $r$ is the order of $a$,

$$
a^r \equiv 1 \pmod N
$$

which is the same as $x^2 - 1 \equiv 0 \pmod N$. We can factor this polynomial as

$$
(x-1)(x+1) \equiv 0 \pmod N. \tag{*}
$$

Note that

$$
\begin{aligned}
x - 1 &\not\equiv 0 \pmod N && \text{by minimality of } r, \\
x + 1 &\not\equiv 0 \pmod N && \text{by the 2nd assumption.}
\end{aligned}
$$

The first line holds because $x - 1 \equiv 0$ would mean $a^{r/2} \equiv 1 \pmod N$, and $r/2$ is smaller than the order $r$.

So the condition $(*)$ is equivalent to

$$
(x-1)(x+1) = kpq,
$$

for some integer $k$. Since neither $x-1$ nor $x+1$ is a multiple of $N$, and $N = pq$, computing

$$
\gcd(N, x-1) \quad \text{and} \quad \gcd(N, x+1)
$$

will find $p$ and $q$: either $p \mid (x-1)$ and $q \mid (x+1)$, or the other way round.

## Order finding = Period finding

An alternative way to look at the problem of finding the order of $a$ modulo $N$, that is, computing $\text{Order}(a,N)$, is to find the **period** of the sequence

$$
a^0, a^1, a^2, a^3, \dots \pmod N
$$

[Fourier transform](/notes/fourier-transform/) and [phase estimation](/notes/phase-estimation/) are the right tools for this.

::pagebreak{lecture="11" page="7"}

Let us now connect the period finding (or order finding) problem to what we discussed in the previous lesson.

Consider the function $f_a : \mathbb{N} \to \{0, \dots, N-1\}$ given by

$$
f_a(x) = a^x \bmod N.
$$

Note that $f_a$ is periodic, with period at most $N$. Also, note that

$$
f_a(0) = f_a(k)
$$

is equivalent to

$$
a^k \equiv 1 \pmod N,
$$

so **the period of $f_a$ is equal to the order of $a$**.

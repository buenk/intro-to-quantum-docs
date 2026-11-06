---
title: "Deutsch's algorithm"
description: "Computing the XOR of f(0) and f(1) with a single query, and interference."
polished: true
sources: [{"lecture":5,"pages":"8-9"}]
exercisesLink: "/exercises/algorithms/#deutschs-algorithm"
---
## Deutsch's algorithm for XOR

Suppose you are given two bits $x_0, x_1 \in \{0,1\}$ and you want to compute $\mathrm{XOR}(x_0, x_1) = x_0 \oplus x_1$. Suppose also that each of these bits is itself the result of some other (possibly very difficult) computation:

$$
x_0 = f(0) \quad\text{and}\quad x_1 = f(1)
$$

for some Boolean function $f : \{0,1\} \to \{0,1\}$. We want to know whether $f(0) \oplus f(1)$ is 0 or 1, that is, whether $f(0) = f(1)$ or $f(0) \neq f(1)$. The only way to find this out on a classical computer is to compute both $f(0)$ and $f(1)$ first and then XOR the results. Hence, classically **two** evaluations of $f$ are required. Surprisingly, quantumly only **one** evaluation of $f$ suffices. Recall that evaluating $f$ on a quantum computer means applying the [bit oracle](/notes/reversible-computation/#computing-a-boolean-function-reversibly) $U_f$ or the [phase oracle](/notes/reversible-computation/#phase-kick-back) $O_f$.

Here is **Deutsch's algorithm** for computing $f(0) \oplus f(1)$ with one application of $O_f$:

![Circuit: |+> goes through O_f, then H, then measurement; with probability 1 the measurement outcome is f(0) xor f(1). Marked states: 1/sqrt2 (|0>+|1>) before O_f, 1/sqrt2((-1)^f(0)|0> + (-1)^f(1)|1>) after O_f, plus or minus |f(0) xor f(1)> after H](../../../assets/figures/L05-p08-1.png "w=803")

The state after $O_f$ can be rewritten by taking out the factor $(-1)^{f(0)}$:

$$
\begin{aligned}
\frac{1}{\sqrt{2}}\left((-1)^{f(0)}\ket{0} + (-1)^{f(1)}\ket{1}\right) &= (-1)^{f(0)} \frac{1}{\sqrt{2}} \left( \ket{0} + (-1)^{f(0) \oplus f(1)} \ket{1} \right) \\
&= (-1)^{f(0)} \begin{cases} \ket{+} & \text{if } f(0) \oplus f(1) = 0 \\ \ket{-} & \text{if } f(0) \oplus f(1) = 1 \end{cases} \\
&\overset{\text{(up to global phase)}}{\sim} \ket{(-1)^{f(0) \oplus f(1)}}
\end{aligned}
\qquad
\boxed{H\ket{(-1)^x} = \ket{x}, \quad x \in \{0,1\}}
$$

Here $\ket{(-1)^x}$ stands for $\ket{+}$ if $x = 0$ and $\ket{-}$ if $x = 1$. By the boxed identity, the final $H$ turns the state into $\pm\ket{f(0) \oplus f(1)}$, so the measurement gives $f(0) \oplus f(1)$ with probability 1.

## Interference

What gives Deutsch's algorithm its advantage over (probabilistic) classical algorithms? It is **interference**: amplitudes with opposite signs can cancel each other out. This cannot happen with probabilities, since they cannot be negative. For example, when $H$ is applied to $\ket{+}$ or $\ket{-}$, as in the last step of Deutsch's algorithm, one of the two amplitudes cancels out:

$$
\begin{aligned}
H\ket{+} &= \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \cdot \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{2} \begin{pmatrix} 1+1 \\ 1-1 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \\
H\ket{-} &= \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \cdot \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ -1 \end{pmatrix} = \frac{1}{2} \begin{pmatrix} 1-1 \\ 1+1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}
\end{aligned}
$$

For probabilistic bits, the analogous computation has no negative numbers in it:

$$
\frac{1}{2} \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix} \cdot \frac{1}{2} \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{4} \begin{pmatrix} 1+1 \\ 1+1 \end{pmatrix} = \underbrace{\frac{1}{2} \begin{pmatrix} 1 \\ 1 \end{pmatrix}}_{\text{no destructive interference}}
$$

## Deutsch's algorithm (full version)

The full version starts from $\ket{0}\ket{0}$ and uses the bit oracle $U_f$. The second qubit is prepared in $\ket{-}$, so that $U_f$ acts as the phase oracle $O_f$ on the first qubit by [phase kick-back](/notes/reversible-computation/#phase-kick-back):

![Circuit: top qubit |0> through H, U_f, H, measurement giving f(0) xor f(1); bottom qubit |0> through X, H, then U_f, ending in |->; intermediate states |0>|1>, |+>|->, (-1)^f(0)|(-1)^(f(0) xor f(1))>|->, (-1)^f(0)|f(0) xor f(1)>|->](../../../assets/figures/L05-p09-1.png "w=671")

This algorithm uses only one call to the subroutine $U_f$ for evaluating $f$, and it succeeds in computing the value of $f(0) \oplus f(1)$ with probability 1.

The last qubit ends in the state $\ket{-}$. We can return it to $\ket{0}$ by applying $H$ and then $X$.

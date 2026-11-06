---
title: "Simon's algorithm"
description: "Simon's algorithm and a comparison of the three query algorithms."
---
::pagesources{items="L06:5-8"}

## Simon's algorithm

::source{lecture="6" pages="5-7"}

Consider a more general function $f:\{0,1\}^n\to\{0,1\}^n$. Let $U_f\ket{x,y} = \ket{x,y\oplus f(x)}$ be the bit oracle for $f$ where $x,y\in\{0,1\}^n$. Let's try a similar procedure:

![Circuit: two n-qubit registers in |0>; Hadamard on each qubit of the first register, oracle U_f on all 2n qubits, second register measured giving t_1, ..., t_n, then Hadamard on each qubit of the first register and measurement giving y_1, ..., y_n; steps labelled 1 to 6](../../../assets/figures/L06-p05-1.png "w=599")

1. $\ket{0}^{\otimes n}\ket{0}^{\otimes n}$
2. $\ket{+}^{\otimes n}\ket{0}^{\otimes n} = \frac{1}{\sqrt{2^n}}\sum_{x\in\{0,1\}^n}\ket{x}\ket{0^n}$
3. $\frac{1}{\sqrt{2^n}}\sum_{x\in\{0,1\}^n}\ket{x}\ket{f(x)}$
4. If we get outcome $t = t_1t_2\ldots t_n\in\{0,1\}^n$ and let $F_t = \{x : f(x) = t\}$ then the remaining state on the first $n$ qubits is
$$
\underbrace{\frac{1}{\sqrt{|F_t|}}\sum_{x\in F_t}\ket{x}}_{\text{a superposition of all } x \text{ such that } f(x)=t}
$$
Let's assume there are exactly two $x$ such that $f(x) = t$. I.e., $F_t = \{x, x+a\}$ for some $x, a\in\{0,1\}^n$. Then the state on the first $n$ qubits is $\frac{1}{\sqrt 2}(\ket{x}+\ket{x+a})$.

5.

$$
H^{\otimes n}\cdot\frac{1}{\sqrt 2}(\ket{x}+\ket{x+a}) = \frac{1}{\sqrt 2}\cdot\frac{1}{\sqrt{2^n}}\sum_{y\in\{0,1\}^n}\left((-1)^{y\cdot x}+(-1)^{y\cdot(x+a)}\right)\ket{y}
$$
$$
\begin{aligned}
&= \frac{1}{\sqrt{2^{n+1}}}\sum_{y\in\{0,1\}^n}(-1)^{y\cdot x}\underbrace{\left(1+(-1)^{y\cdot a}\right)}_{0\text{ or }2}\ket{y} = \frac{1}{\sqrt{2^{n+1}}}\sum_{y:\,y\cdot a=0}(-1)^{y\cdot x}\,\underbrace{2}_{\text{Keep only non-zero terms}}\ket{y}\\
&= \underbrace{\frac{1}{\sqrt{2^{n-1}}}\sum_{y:\,y\cdot a=0}(-1)^{y\cdot x}\ket{y}}_{\text{a superposition of all } y \text{ such that } y\cdot a=0,\ \text{i.e., } y\perp a}
\end{aligned}
$$

::pagebreak{lecture="6" page="6"}

6. When we measure $\frac{1}{\sqrt{2^{n-1}}}\sum_{y:\,y\cdot a=0}(-1)^{y\cdot x}\ket{y}$ in the computational basis, the phases $(-1)^{y\cdot x}$ do not play any role, so we simply get a uniformly random $y\in\{0,1\}^n$ such that $y\cdot a = 0$. This gives us information about $a$.

Note that for any given $a\neq 0^n$ half of the strings $y\in\{0,1\}^n$ are such that $y\cdot a = 0$ and half of them are such that $y\cdot a = 1$ (just change the $i$-th bit of $y$ for any $i\in\{1,\ldots,n\}$ such that $a_i = 1$ to modify the value of $y\cdot a$). Hence the number of strings $y\in\{0,1\}^n$ such that $y\cdot a = 0$ is indeed $2^n/2 = 2^{n-1}$.

If we want the above procedure to always work, we need to make sure $|F_t| = 2$ for any $t\in\{0,1\}^n$. I.e., we want the function $f:\{0,1\}^n\to\{0,1\}^n$ evaluated by the oracle to be 2-to-1. Moreover, if we want to learn information about the same $a\in\{0,1\}^n$, we want $f(x) = f(x+a)$ for all $x\in\{0,1\}^n$, meaning that $F_t = \{x : f(x) = t\} = \{x_t, x_t+a\}$ where $x_t\in\{0,1\}^n$ depends on $t$ but $a$ does not.

**Assumption**: There exists an $a\neq 0^n$, $a\in\{0,1\}^n$ such that
$$
f(x) = f(x') \iff x'-x = a
$$
*(Example with $a = 01$: $f(00) = 11$, $f(01) = 11$, $f(10) = 01$, $f(11) = 01$.)*

This means that $f$ is invariant under a shift by some string $a\in\{0,1\}^n$, $a\neq 0^n$, and it takes different values on all pairs of arguments that do not differ by $a$.

**Conclusion**: With one evaluation of such $f$, a quantum algorithm can find a uniformly random $y$ that is orthogonal to $a$, i.e., $y\cdot a = 0$.

::pagebreak{lecture="6" page="7"}

If we execute this quantum subroutine many times (roughly $n$), we get enough vectors orthogonal to $a$ that they in fact uniquely determine $a$. So here is the problem the algorithm solves:

**Problem**: promised that $f:\{0,1\}^n\to\{0,1\}^n$ is such that $f(x) = f(x')$ if and only if $x - x' = a$, for some unknown $a\in\{0,1\}^n$, $a\neq 0^n$, determine $a$ by evaluating $f$ on inputs of your choice.

Here is the full Simon's algorithm, including the classical post-processing of the measurement outcomes.

**Algorithm**

1. For $i = 1$ to $n+3$ do

   Execute the quantum subroutine to get a uniformly random $y_i\in\{0,1\}^n$ such that $y_i\cdot a = 0$.

2. Using Gaussian elimination modulo 2 (or any other method) solve classically the linear system to find $a\in\{0,1\}^n$:
$$
\begin{cases} y_1\cdot a = 0\\ y_2\cdot a = 0\\ \vdots\\ y_{n+3}\cdot a = 0\end{cases}
$$

3. If it has a unique solution, output it. Otherwise output "FAIL".

**Result**: The above quantum algorithm evaluates $f$ $n+3$ times and finds $a$ with probability $\geq\frac{2}{3}$. Any probabilistic classical algorithm needs to evaluate $f$ at least $\sim 2^{n/3}$ times to find $a$ with probability $\geq\frac{2}{3}$.

## Comparison of the three algorithms

::source{lecture="6" pages="8"}

Below is a table comparing the complexities of the three problems we discussed in the class. In each case I list the number of queries to the function $f$ and the success probability of the algorithm. We compare deterministic, probabilistic, and quantum algorithms. We would like to achieve a large gap between quantum and probabilistic algorithms -- this would show that quantum computers are indeed more powerful. We don't care about the exact value of the success probability, as long as it is strictly larger than $1/2$. We can amplify it arbitrarily close to 1 by repeating the algorithm a constant number of times.

|               | Deutsch-Jozsa: Queries | Deutsch-Jozsa: Prob. | Bernstein-Vazirani: Queries | Bernstein-Vazirani: Prob. | Simon: Queries | Simon: Prob. |
|---------------|-----|-----|------|-------|---------|-------|
| Deterministic | $2^{n-1}+1$ | $1$ | $n$ | $1$ | $2^{n-1}+1$ | $1$ |
| Probabilistic | $2$ | $3/4$ | $O(n)$ | $\geq 3/4$ | $2^{n/3}$ | $\geq 2/3$ |
| Quantum | $1$ | $1$ | $1$ | $1$ | $n+3$ | $\geq 2/3$ |

Simon's algorithm requires exponentially fewer queries compared to the best possible probabilistic algorithm.

---
title: "Reversible computation and oracles"
description: "Reversibility, controlled gates, the Toffoli gate, uncomputing trash and phase kick-back."
polished: true
sources: [{"lecture":5,"pages":"1-7"}]
exercisesLink: "/exercises/circuits/#reversible-computation-and-oracles"
---
Quantum computers are supposed to be very powerful, but can they actually compute simple Boolean functions like AND?

## Quantum AND?

Is there a 2-qubit unitary that computes the logical AND? Given $x, y \in \{0,1\}$, it should output $\mathrm{AND}(x,y)$ on the first qubit:

![Circuit: a box labelled AND with inputs |x> and |y> and outputs |AND(x,y)> on the first qubit and |?> on the second](../../../assets/figures/L05-p01-1.png "w=324")

What should be the output on the second qubit? Let's try some arbitrary states $\ket{\psi_i}$:

$$
\begin{aligned}
\ket{00} &\mapsto \ket{0}\ket{\psi_1} \\
\ket{01} &\mapsto \ket{0}\ket{\psi_2} \\
\ket{10} &\mapsto \ket{0}\ket{\psi_3} \\
\ket{11} &\mapsto \ket{1}\ket{\psi_4}
\end{aligned}
$$

But a unitary gate must preserve orthogonality. The inputs $\ket{00}, \ket{01}, \ket{10}$ are orthogonal and all three give $\ket{0}$ in the first register, so the three output states $\ket{\psi_1}, \ket{\psi_2}, \ket{\psi_3} \in \C^2$ must be orthogonal. But this is impossible, since we only have two dimensions.

Are we doomed? Are quantum computers not even able to do what classical computers can? This would be very unfortunate and make them hard to compare. Luckily, this is not the case, but we need to explicitly address this issue. We will then come back to the quantum AND example and see how to resolve it.

## Reversibility

The main problem we encounter when trying to run a classical algorithm on a quantum computer is reversibility.

Recall that a [quantum algorithm](/notes/quantum-circuits/#quantum-algorithm) is a sequence of unitary operations and that any unitary operation is **invertible**: $U^{-1} = U^\dagger$. This means that we can undo any operation and go back to the previous state. For example, if the state at step 3 is $U_3 U_2 U_1 \ket{0}$, we can apply $U_3^\dagger$ to get back to

$$
U_3^\dagger U_3 U_2 U_1 \ket{0} = U_2 U_1 \ket{0},
$$

which is the state after step 2. This property is called **reversibility**. As a consequence, we cannot, for example, erase information, because that would prevent us from going back.

This makes it seem like quantum computation is more restrictive than deterministic or probabilistic computation, which include non-reversible operations. Luckily, this is not a problem, since it turns out that we can implement all non-reversible operations in a reversible way. Let us figure out how this works for deterministic operations, that is, how to compute any Boolean function in a reversible way.

## Computing a Boolean function reversibly

Let $f : \{0,1\}^n \to \{0,1\}$ be an $n$-argument Boolean function. Clearly, the map

$$
\ket{x} \mapsto \ket{f(x)}
$$

in general is not reversible and hence not unitary. A simple way of making any deterministic map reversible is by keeping the input:

$$
\ket{x} \mapsto \ket{x, f(x)}.
$$

While this is reversible, it is not unitary, since the output dimension is larger than the input dimension. We can make the dimensions match by adding a dummy $\ket{0}$ to the input:

$$
\ket{x, 0} \mapsto \ket{x, f(x)}
$$

Is this unitary? More specifically, can it be implemented by a **permutation matrix**, that is, an invertible linear operator that maps standard basis states to standard basis states? (Such a deterministic operation is a special case of a unitary operation.) The above map is still not good enough for this, because

- it is not fully defined (what is the image of $\ket{x,1}$?),
- nor is its inverse (what is the pre-image of $\ket{x,y}$ when $y \neq f(x)$?).

An elegant way to get around both issues and turn $f$ into a permutation (and hence also a unitary) is by defining

$$
U_f \ket{x,y} = \ket{x, y \oplus f(x)}
$$

for all $x \in \{0,1\}^n$ and $y \in \{0,1\}$. Note that $U_f^2 = I$, that is, $U_f$ is self-inverse, since $U_f^2 \ket{x,y} = \ket{x, y \oplus f(x) \oplus f(x)} = \ket{x,y}$. We will call $U_f$ the **bit oracle** for the function $f$.

## Controlled gates

Now we know that any $f : \{0,1\}^n \to \{0,1\}$ can in principle be made reversible. But how do we actually implement it as a sequence of elementary reversible steps? That is, given a logical circuit for $f$ in terms of elementary logical operations, how do we implement each step reversibly? Here are some useful gates for this.

The CNOT or **controlled-NOT** gate is a 2-qubit gate that flips the second bit (the target) if the first bit (the control) is in state $\ket{1}$: $\mathrm{CNOT}\ket{x,y} = \ket{x, y \oplus x}$ for $x, y \in \{0,1\}$.

$$
\begin{aligned}
\ket{00} &\mapsto \ket{00} \\
\ket{01} &\mapsto \ket{01} \\
\ket{10} &\mapsto \ket{11} \\
\ket{11} &\mapsto \ket{10}
\end{aligned}
\qquad
\mathrm{CNOT} = \begin{pmatrix} 1&0&0&0 \\ 0&1&0&0 \\ 0&0&0&1 \\ 0&0&1&0 \end{pmatrix}
$$

![Circuit: CNOT gate, control dot on the top wire |x> and target on the bottom wire |y>, outputs |x> and |y xor x>](../../../assets/figures/L05-p04-1.png "w=240")

Note that $\mathrm{CNOT} = \underbrace{U_f}_{\text{(bit oracle)}}$ for the identity function $f(x) = x$, $x \in \{0,1\}$. Also, $\mathrm{CNOT}\ket{x,0} = \ket{x,x}$, so it **copies in the standard basis**. However, CNOT does not copy an arbitrary state: in general, $\mathrm{CNOT}\ket{\psi}\otimes\ket{0} \neq \ket{\psi}\otimes\ket{\psi}$.

It is useful to notice that $\mathrm{CNOT} = \ketbra{0}{0} \otimes I + \ketbra{1}{1} \otimes X$, where $X = \mathrm{NOT} = \begin{pmatrix} 0&1 \\ 1&0 \end{pmatrix}$. Intuitively, this equation says: if qubit 1 is $\ket{0}$, do nothing (or apply $I$) to qubit 2, and if qubit 1 is $\ket{1}$ then invert qubit 2 (apply $X$).

More generally, if $U$ is any single-qubit unitary then the **controlled-$U$** gate maps $\ket{x}\otimes\ket{y} \mapsto \ket{x}\otimes U^x\ket{y}$ for $x, y \in \{0,1\}$.

$$
\begin{aligned}
\ket{00} &\mapsto \ket{00} \\
\ket{01} &\mapsto \ket{01} \\
\ket{10} &\mapsto \ket{1}\otimes U\ket{0} \\
\ket{11} &\mapsto \ket{1}\otimes U\ket{1}
\end{aligned}
\qquad
\begin{pmatrix} 1&0&0&0 \\ 0&1&0&0 \\ 0&0&\mathrlap{\;\;U}&\phantom{0} \\ 0&0&\phantom{0}&\phantom{0} \end{pmatrix}
$$

![Circuit: controlled-U gate with control on the top wire |x> and U on the bottom wire, outputs |x> and U^x|y>; boxed note U^0 = I, U^1 = U](../../../assets/figures/L05-p04-2.png "w=341")

## Toffoli gate

The Toffoli gate is a three-(qu)bit gate that flips the last bit only when the first two bits are both in state 1:

$$
\ket{x_1, x_2, y} \mapsto \ket{x_1, x_2, y \oplus x_1 x_2}, \text{ for all } x_1, x_2, y \in \{0,1\}.
$$

![Circuit: Toffoli gate, controls on |x1> and |x2>, target on |y>, outputs |x1>, |x2>, |y xor x1x2>](../../../assets/figures/L05-p05-1.png "w=321")

Note that:

- this is the same as controlled-controlled-NOT (NOT on the third qubit, controlled on the first two qubits),
- since $\mathrm{AND}(x_1, x_2) = x_1 x_2$, this is the bit oracle $U_{\mathrm{AND}}$ for the AND function (hence also a reversible implementation of the **AND gate**).

An important fact about the Toffoli gate is that it is **universal for reversible classical computation**, meaning that by having access to enough 0 and 1 bits and setting the inputs of all Toffoli gates appropriately, you can implement AND, NOT, and FANOUT where

$$
\mathrm{FANOUT}(x) = (x, x)
$$

![Diagram: fanout, a wire x with a dot splitting into two wires each carrying x](../../../assets/figures/L05-p05-2.png "w=229")

By combining these you can implement any logical circuit and hence any Boolean function reversibly!

For example, to implement XOR, set the second control bit to 1:

![Circuit: Toffoli gate with controls |x1> and |1> and target |y>, output |y xor x1> = |XOR(y,x1)>](../../../assets/figures/L05-p05-3.png "w=387")

## Getting rid of trash...

There is still one more problem: using the Toffoli gate to implement elementary logical gates will generally consume some amount of 0's and 1's and produce various unwanted garbage bits that store intermediate results of the computation to guarantee that it is reversible. In other words, what we end up implementing amounts to something like

$$
\ket{x, \underbrace{0^n 1^m}_{\text{$n$ copies of 0 and $m$ copies of 1}}, 0} \overset{V_f}{\longmapsto} \ket{x, \underbrace{\mathrm{trash}(x)}_{\text{some trash that depends on } x}, f(x)}
$$

Can we get rid of $\mathrm{trash}(x)$ and return these bits to $0^n 1^m$ or is it fundamentally unavoidable? Surprisingly, we can copy the answer and **uncompute** the trash:

![Circuit: V_f (some circuit of Toffoli gates) acts on |x>, ancilla bits |0^n>, |1^m>, |0>; the f(x) wire is copied by a CNOT onto a fresh |0> qubit; then V_f^dagger returns outputs |x>, |0^n>, |1^m>, |0>, |f(x)>; intermediate states |x, trash(x), f(x), 0> and |x, trash(x), f(x), f(x)> are marked](../../../assets/figures/L05-p06-1.png "w=750")

This works because $V_f^\dagger$ does not act on the last qubit: it undoes $V_f$ and returns the other bits to their initial values, while the copy of $f(x)$ stays. This way you can reversibly implement the bit oracle $U_f$ for any Boolean function $f$.

## Phase kick-back

Note that $X\ket{-} = \frac{1}{\sqrt{2}}(X\ket{0} - X\ket{1}) = \frac{1}{\sqrt{2}}(\ket{1} - \ket{0}) = -\ket{-}$. Since $X^0 = I$, we have $X^x\ket{y} = \ket{y \oplus x}$ and we get

$$
X^x \ket{-} = (-1)^x \ket{-}
$$

for any $x \in \{0,1\}$. More generally, for any bit oracle $U_f$, $U_f\ket{x}\ket{y} = \ket{x}\ket{y \oplus f(x)}$ for all $x \in \{0,1\}^n$ and $y \in \{0,1\}$ and so

$$
U_f \ket{x}\ket{-} = (-1)^{f(x)} \ket{x}\ket{-}
$$

which is known as **phase kick-back**. Pictorially,

![Circuit: U_f with inputs |x> and |->, outputs (-1)^f(x)|x> and |->](../../../assets/figures/L05-p07-1.png "w=379")

Since the last qubit is returned in the same state, we can think of this as using the bit oracle $U_f$ and an extra ancillary qubit $\ket{-}$ to simulate the **phase oracle**

$$
O_f \ket{x} = (-1)^{f(x)} \ket{x}
\qquad
O_f = \begin{pmatrix} (-1)^{f(00\ldots0)} & & & \\ & (-1)^{f(00\ldots1)} & & \\ & & \ddots & \\ & & & (-1)^{f(11\ldots1)} \end{pmatrix}
$$

which is a diagonal $n$-qubit operation with $(-1)^{f(x)}$ as the $x$-th entry, $x \in \{0,1\}^n$, on the diagonal.

In summary, by setting the last qubit of the bit oracle $U_f$ to be $\ket{-}$, we can implement the phase oracle $O_f$. Because of this, we will often assume that we are directly given the phase oracle.

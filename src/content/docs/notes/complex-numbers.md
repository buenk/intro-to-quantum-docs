---
title: "Complex numbers"
description: "Algebraic and exponential form, geometry and arithmetic of ℂ."
polished: true
sources: [{"lecture":1,"pages":"7-8"}]
exercisesLink: "/exercises/foundations/#complex-numbers"
---
Qubits differ from probabilistic bits in two ways: the probabilities are replaced by complex numbers called *amplitudes*, and these amplitudes are squared when you measure. So before we get to qubits, here is a short review of complex numbers.

## Two ways to write a complex number

The **imaginary unit** $i$ is a number with $i^2 = -1$. We write $\R$ for the real numbers and $\C$ for the complex numbers. Every **complex number** $z \in \C$ can be written in two forms:

- algebraic form: $z = a + ib$, where $a, b \in \R$
- exponential form: $z = r e^{i\varphi}$, where $r \geq 0$ and $\varphi \in [0, 2\pi)$

**Euler's formula** connects the two:

$$
e^{i\varphi} = \cos\varphi + i \sin\varphi \qquad\qquad \varphi \in \R
$$

Multiplying both sides by $r$ shows that $r e^{i\varphi}$ is the number $a + ib$ with $a = r\cos\varphi$ and $b = r\sin\varphi$.

Just like the real exponential, the complex exponential turns a sum in the exponent into a product:

$$
e^{i(\alpha + \beta)} = e^{i\alpha} \cdot e^{i\beta} \qquad\qquad \alpha, \beta \in \R
$$

In particular, $e^{i\varphi}$ and $e^{-i\varphi}$ multiply to 1:

$$
e^{i\varphi} \cdot e^{-i\varphi} = e^{i(\varphi - \varphi)} = e^0 = 1
$$

So $e^{-i\varphi}$ is the multiplicative inverse of $e^{i\varphi}$, that is, $1/e^{i\varphi} = e^{-i\varphi}$.

## Geometry of ℂ

You can picture a complex number $z = a + ib$ as the point $(a, b)$ in the plane:

![Complex plane with Im and Re axes: vector z of length r at angle phi from the real axis, with real part a and imaginary part b marked by dashed lines, and its conjugate z-bar as the reflection below the real axis](../../../assets/figures/L01-p08-1.png "w=353")

Its two coordinates are the **real part** and the **imaginary part** of $z$:

$$
a = \mathrm{Re}\, z \qquad\qquad b = \mathrm{Im}\, z
$$

The exponential form describes the same point in polar coordinates: $r$ is its distance from the origin, and $\varphi$ is its angle with the real axis (the $x$ axis).

## Arithmetic of ℂ

Each operation is easiest in one of the two forms: addition in the algebraic form, multiplication in the exponential form.

### Addition and multiplication

Addition and subtraction work part by part:

$$
(a + ib) \pm (c + id) = (a \pm c) + i(b \pm d)
$$

To multiply in algebraic form, expand the brackets and use $i^2 = -1$:

$$
(a + ib) \cdot (c + id) = (ac - bd) + i(ad + bc)
$$

In exponential form, multiplication is simpler: the lengths multiply and the angles add.

$$
r_1 e^{i\varphi_1} \cdot r_2 e^{i\varphi_2} = r_1 r_2\, e^{i(\varphi_1 + \varphi_2)}
$$

### Absolute value

The **absolute value** $|z|$ is the distance from $z$ to the origin:

$$
|z| = \sqrt{a^2 + b^2} = r \qquad\qquad |z_1 \cdot z_2| = |z_1| \cdot |z_2|
$$

The second rule follows from multiplication in exponential form, where the lengths multiply.

The *squared* absolute value comes up even more often:

$$
|z|^2 = a^2 + b^2 = r^2
$$

For qubits, this is how amplitudes become probabilities: the probability of a measurement outcome is the squared absolute value of its amplitude (see [Qubits](/notes/qubits/)).

### Complex conjugation

The **complex conjugate** of $z$, written $\bar{z}$ or $z^*$, flips the sign of the imaginary part. In particular, $\bar{i} = -i$.

$$
\bar{z} = z^* = a - ib = r e^{-i\varphi}
$$

Geometrically, $\bar{z}$ is the reflection of $z$ in the real axis, as in the figure above.

Conjugation gives a quick way to compute the squared absolute value:

$$
z \cdot \bar{z} = (a + ib)(a - ib) = a^2 + b^2 = |z|^2
$$

It also picks out the real and imaginary parts:

$$
z + \bar{z} = 2\,\mathrm{Re}\, z \qquad\qquad z - \bar{z} = 2i\,\mathrm{Im}\, z
$$

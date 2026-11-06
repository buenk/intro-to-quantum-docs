---
title: "Graphical notation"
description: "Tensor-network diagrams, purification, Bell states and teleportation in pictures."
---
::pagesources{items="L13:10-15" exercises="/exercises/mixed-states/#graphical-notation"}

## Graphical notation

::source{lecture="13" pages="10-12"}

There is an intuitive way of performing certain types of calculations that involves pictures instead of equations. This graphical notation is also known as **tensor networks**.

- Column vector $\ket{\psi} \in \C^d$

  $$
  \ket{\psi} = \sum_{j=1}^d \psi_j \ket{j}
  $$

  ![Tensor diagram: a triangle labelled psi with one leg labelled j](../../../assets/figures/L13-p10-1.png "w=113")

- Matrix $A \in M_d(\C)$

  $$
  A = \sum_{i,j=1}^d a_{ij} \ket{i}\!\bra{j}
  $$

  ![Tensor diagram: a box labelled A with a leg i on the left and a leg j on the right](../../../assets/figures/L13-p10-2.png "w=150")

- Matrix-vector multiplication:

  $$
  \forall i: \sum_{j=1}^d A_{ij}\psi_j = \varphi_i
  $$

  ![Tensor diagram: box A with legs i and j, connected via j to triangle psi, equals triangle phi with leg i](../../../assets/figures/L13-p10-3.png "w=338")

- Matrix-matrix multiplication:

  $$
  \forall i,k: \sum_{j=1}^d A_{ij}B_{jk} = C_{ik}
  $$

  ![Tensor diagram: box A with leg i, connected via j to box B with leg k, equals box C with legs i and k](../../../assets/figures/L13-p10-4.png "w=357")

- Identity matrix:

  $$
  I = \sum_{i=1}^d \ket{i}\!\bra{i}
  $$

  ![Tensor diagram: a plain line (identity)](../../../assets/figures/L13-p10-5.png "w=167")

::pagebreak{lecture="13" page="11"}

- Tensor product:

  $$
  A \otimes B
  $$

  ![Tensor diagram: box A with a leg on each side, above box B with a leg on each side](../../../assets/figures/L13-p11-1.png "w=127")

- Matrix transpose:

  $$
  A^\mathsf{T} = \sum_{i,j=1}^d a_{ij}\ket{j}\!\bra{i}
  $$

  ![Tensor diagram: box A^T equals box A with its two legs bent around so the left and right legs are swapped, drawn in two equivalent ways](../../../assets/figures/L13-p11-2.png "w=653")

- Vector (conjugate) transpose:

  $$
  \bra{\psi} = \ket{\bar\psi}^\mathsf{T} =
  $$

  ![Tensor diagram: triangle psi-bar with its leg bent around to the other side, drawn in two equivalent ways, defined to be a left-pointing triangle psi-bar with a leg](../../../assets/figures/L13-p11-3.png "w=406")

  ![Tensor diagram: ket psi equals a leg into a triangle psi; bra psi equals a left-pointing triangle psi-bar with a leg](../../../assets/figures/L13-p11-4.png "w=523")

- Probability to get $\ket{\psi}$ when measuring $\rho$:

  $$
  \braket{\psi|\rho|\psi} =
  $$

  ![Tensor diagram: left-pointing triangle psi-bar, box rho, triangle psi connected in a row](../../../assets/figures/L13-p11-5.png "w=198")

- Trace:

  $$
  \Tr M = \sum_{i=1}^d \braket{i|M|i} = \sum_{i=1}^d
  $$

  ![Tensor diagram: left-pointing triangle i, box M, triangle i connected in a row](../../../assets/figures/L13-p11-6.png "w=174")

  ![Tensor diagram: equals the sum over i from 1 to d of a bow-tie (triangle i and left-pointing triangle i), which is the identity I, connected to box M, with M's right leg looped back around to the left; this equals box M with its two legs i joined in a loop](../../../assets/figures/L13-p11-7.png "w=607")

::pagebreak{lecture="13" page="12"}

- Partial trace:

  $$
  \Tr_B N_{AB} =
  $$

  ![Tensor diagram: box N with legs A and B on the left and two legs on the right, the B legs joined by a loop, equals a box with one leg on each side](../../../assets/figures/L13-p12-1.png "w=303")

- **Un-normalized** maximally entangled state:

  $$
  I = \sum_{i=1}^d \ket{i}\!\bra{i} =
  $$

  ![Tensor diagram: sum over i from 1 to d of a bow-tie with labels i, equals a plain line with label i on each end](../../../assets/figures/L13-p12-2.png "w=258")

  $$
  \ket{\Phi} := \sum_{i=1}^d \ket{i}\ket{i} =
  $$

  ![Tensor diagram: triangle Phi with two legs on its left equals a cup joining the legs labelled i and i; bra Phi equals a cap joining the legs i and i](../../../assets/figures/L13-p12-3.png "w=419")

- SWAP gate:

  $$
  \mathrm{SWAP} = \sum_{i,j=1}^d \ket{i}\ket{j}\bra{j}\bra{i} =
  $$

  ![Tensor diagram: two crossing lines, the leg i at top left goes to j at top right and the leg j at bottom left goes to i at bottom right](../../../assets/figures/L13-p12-4.png "w=182")

- Vectorization:

  $$
  X = \sum_{i,j=1}^d x_{ij}\ket{i}\!\bra{j} =
  $$

  ![Tensor diagram: box X with leg i on the left and leg j on the right](../../../assets/figures/L13-p12-5.png "w=129")

  $$
  \mathrm{vec}(X) = \sum_{i,j=1}^d x_{ij}\ket{i}\ket{j} =
  $$

  ![Tensor diagram: box X with leg i on the left, its right leg bent around below so that the second leg j also points to the left](../../../assets/figures/L13-p12-6.png "w=161")

- Sliding:

  $$
  \mathrm{vec}(X) =
  $$

  ![Tensor diagram: vec(X) as box X with its right leg bent around below, equals a box X^T with its legs looped around it, equals a box X^T on the lower strand with the strands joined at the right](../../../assets/figures/L13-p12-7.png "w=504")

- Vectorization identity:

  $$
  (A \otimes B)\,\mathrm{vec}(X) = \mathrm{vec}(AXB^\mathsf{T})
  $$

  ![Tensor diagram: boxes A and X on the top strand and B on the bottom strand joined at the right, equals boxes A, X, B^T on the top strand with the bottom strand joined at the right](../../../assets/figures/L13-p12-8.png "w=484")

## Purification

::source{lecture="13" pages="13"}

Given a mixed state $\rho_A$, find a pure state $\ket{\Psi}_{AB}$ such that discarding the B system produces $\rho_A$:

$$
\Tr_B(\ket{\Psi}\!\bra{\Psi}_{AB}) = \rho_A
$$

Such $\ket{\Psi}_{AB}$ is known as a **purification** of $\rho_A$.

:::example

The maximally entangled state

$$
\ket{\beta}_{AB} = \frac{1}{\sqrt{d}}\ket{\Phi} = \frac{1}{\sqrt{d}}\sum_{i=1}^d \ket{i}\ket{i}
$$

is a purification of the maximally mixed state $I/d$ since

$$
\Tr_B(\ket{\beta}\!\bra{\beta}_{AB}) = \frac{1}{d}
$$

![Tensor diagram: the cup and cap for systems A and B with the B legs joined by a loop, equal to 1/d times a plain line, equal to 1/d times I](../../../assets/figures/L13-p13-1.png "w=440")

:::

For a general state $\rho$, with spectral decomposition

$$
\rho = \sum_i \lambda_i \ket{\psi_i}\!\bra{\psi_i}, \qquad \lambda_i \geq 0,
$$

its operator square root is given by

$$
\sqrt{\rho} = \sum_i \sqrt{\lambda_i}\ket{\psi_i}\!\bra{\psi_i}.
$$

You can verify that $\sqrt{\rho}\sqrt{\rho} = \rho$ and

$$
\ket{\Psi}_{AB} := (\sqrt{\rho_A} \otimes I_B)\ket{\Phi}_{AB}
$$

is a purification of $\rho_A$.

## Bell states and Pauli matrices

::source{lecture="13" pages="14"}

Bell states are related to Pauli matrices as follows (local conversion identities):

$$
\ket{\beta_{zx}} = \frac{1}{\sqrt{2}}\mathrm{vec}(Z^z X^x) \qquad \forall z, x \in \{0,1\}
$$

![Tensor diagram: triangle beta_zx with two legs on the left equals 1/sqrt2 times boxes Z^z and X^x on the top strand with the strands joined at the right, equals 1/sqrt2 times boxes X^x and Z^z on the bottom strand](../../../assets/figures/L13-p14-1.png "w=469")

$Z^\mathsf{T} = Z$, $X^\mathsf{T} = X$ (by sliding)

## Teleportation

::source{lecture="13" pages="14-15"}

Here is how you can derive and analyze the teleportation protocol based on diagrams. Alice has an unknown state $\ket{\psi}_{A'} \in \C^2$ and shares with Bob the EPR state $\frac{1}{\sqrt{2}}(\ket{00} + \ket{11})_{AB} = \frac{1}{\sqrt{2}}\ket{\Phi}_{AB}$. If she measures her systems $A'A$ in the Bell basis and gets the outcome 00 corresponding to the EPR state $\ket{\beta_{00}} = \frac{1}{\sqrt{2}}\ket{\Phi}$, Bob's state is $\ket{\psi}_B$:

![Teleportation diagram, time running right to left: 1/2 times a triangle psi on Bob's strand equals 1/sqrt2 times the state psi on A' and the cup joining A and B shared with 1/sqrt2, with a dashed line separating Alice (top) and Bob (bottom)](../../../assets/figures/L13-p14-2.png "w=720")

This happens with probability $\left(\frac{1}{2}\right)^2 = \frac{1}{4}$.

::pagebreak{lecture="13" page="15"}

More generally, if Alice gets outcomes $z, x \in \{0,1\}$, she sends them to Bob who needs to apply the Pauli correction operator $Z^z X^x$:

![Teleportation diagram with Pauli correction: Alice's outcome beta_zx is sent to Bob who applies Z^z and X^x on his strand B, shown with the state psi on A', boxes X^x and Z^z on the cup between A and B, and 1/sqrt2 factors](../../../assets/figures/L13-p15-1.png "w=695")

This reproduces the correct state $\ket{\psi}$ since

![Tensor diagram: triangle psi equals the chain Z^z, X^x, X^x, Z^z followed by triangle psi](../../../assets/figures/L13-p15-2.png "w=603")

because $X^0 = X^2 = I = Z^0 = Z^2$.

Graphical notation and tensor networks is not only a fun theoretical tool but also has important practical applications. One of such applications is the simulation of quantum circuits on a classical computers, such as in Cirq.

---
title: "Graphical notation"
description: "Tensor-network diagrams, purification, Bell states and teleportation in pictures."
polished: true
sources: [{"lecture":13,"pages":"10-15"}]
exercisesLink: "/exercises/mixed-states/#graphical-notation"
---
## Graphical notation

There is an intuitive way of performing certain types of calculations that involves pictures instead of equations. This graphical notation is also known as **tensor networks**. A vector or matrix is drawn as a shape with one leg for each of its indices, and connecting two legs means summing over the shared index.

- A column vector $\ket{\psi} \in \C^d$ is a triangle with one leg:

  $$
  \ket{\psi} = \sum_{j=1}^d \psi_j \ket{j}
  $$

  ![Tensor diagram: a triangle labelled psi with one leg labelled j](../../../assets/figures/L13-p10-1.png "w=113")

- A matrix $A \in M_d(\C)$ is a box with two legs, one for the row index $i$ and one for the column index $j$:

  $$
  A = \sum_{i,j=1}^d a_{ij} \ket{i}\!\bra{j}
  $$

  ![Tensor diagram: a box labelled A with a leg i on the left and a leg j on the right](../../../assets/figures/L13-p10-2.png "w=150")

- Matrix-vector multiplication sums over $j$, so the leg $j$ of $A$ is connected to $\psi$:

  $$
  \forall i: \sum_{j=1}^d A_{ij}\psi_j = \varphi_i
  $$

  ![Tensor diagram: box A with legs i and j, connected via j to triangle psi, equals triangle phi with leg i](../../../assets/figures/L13-p10-3.png "w=338")

- Matrix-matrix multiplication works the same way:

  $$
  \forall i,k: \sum_{j=1}^d A_{ij}B_{jk} = C_{ik}
  $$

  ![Tensor diagram: box A with leg i, connected via j to box B with leg k, equals box C with legs i and k](../../../assets/figures/L13-p10-4.png "w=357")

- The identity matrix is a plain line:

  $$
  I = \sum_{i=1}^d \ket{i}\!\bra{i}
  $$

  ![Tensor diagram: a plain line (identity)](../../../assets/figures/L13-p10-5.png "w=167")

::pagebreak{lecture="13" page="11"}

- In a tensor product, the two boxes are drawn one above the other, with no legs connected:

  $$
  A \otimes B
  $$

  ![Tensor diagram: box A with a leg on each side, above box B with a leg on each side](../../../assets/figures/L13-p11-1.png "w=127")

- The matrix transpose swaps the two indices, so the legs of $A$ are bent around to the opposite sides:

  $$
  A^\mathsf{T} = \sum_{i,j=1}^d a_{ij}\ket{j}\!\bra{i}
  $$

  ![Tensor diagram: box A^T equals box A with its two legs bent around so the left and right legs are swapped, drawn in two equivalent ways](../../../assets/figures/L13-p11-2.png "w=653")

- For a vector, the conjugate transpose bends the leg of $\ket{\bar\psi}$ around, and we draw the result as a triangle pointing the other way:

  $$
  \bra{\psi} = \ket{\bar\psi}^\mathsf{T} =
  $$

  ![Tensor diagram: triangle psi-bar with its leg bent around to the other side, drawn in two equivalent ways, defined to be a left-pointing triangle psi-bar with a leg](../../../assets/figures/L13-p11-3.png "w=406")

  So kets point right and bras point left:

  ![Tensor diagram: ket psi equals a leg into a triangle psi; bra psi equals a left-pointing triangle psi-bar with a leg](../../../assets/figures/L13-p11-4.png "w=523")

- The probability to get $\ket{\psi}$ when measuring $\rho$ is

  $$
  \braket{\psi|\rho|\psi} =
  $$

  ![Tensor diagram: left-pointing triangle psi-bar, box rho, triangle psi connected in a row](../../../assets/figures/L13-p11-5.png "w=198")

- The trace is

  $$
  \Tr M = \sum_{i=1}^d \braket{i|M|i} = \sum_{i=1}^d
  $$

  ![Tensor diagram: left-pointing triangle i, box M, triangle i connected in a row](../../../assets/figures/L13-p11-6.png "w=174")

  ![Tensor diagram: equals the sum over i from 1 to d of a bow-tie (triangle i and left-pointing triangle i), which is the identity I, connected to box M, with M's right leg looped back around to the left; this equals box M with its two legs i joined in a loop](../../../assets/figures/L13-p11-7.png "w=607")

  The sum of the bow-ties is the identity, a plain line, so the trace joins the two legs of $M$ in a loop.

::pagebreak{lecture="13" page="12"}

- The partial trace joins only the two $B$ legs:

  $$
  \Tr_B N_{AB} =
  $$

  ![Tensor diagram: box N with legs A and B on the left and two legs on the right, the B legs joined by a loop, equals a box with one leg on each side](../../../assets/figures/L13-p12-1.png "w=303")

- To draw the **un-normalized** maximally entangled state, first note that the identity, a sum of bow-ties, is a plain line:

  $$
  I = \sum_{i=1}^d \ket{i}\!\bra{i} =
  $$

  ![Tensor diagram: sum over i from 1 to d of a bow-tie with labels i, equals a plain line with label i on each end](../../../assets/figures/L13-p12-2.png "w=258")

  In $\ket{\Phi}$, both legs point the same way, so it is a cup, and $\bra{\Phi}$ is a cap:

  $$
  \ket{\Phi} := \sum_{i=1}^d \ket{i}\ket{i} =
  $$

  ![Tensor diagram: triangle Phi with two legs on its left equals a cup joining the legs labelled i and i; bra Phi equals a cap joining the legs i and i](../../../assets/figures/L13-p12-3.png "w=419")

- The SWAP gate crosses two lines:

  $$
  \mathrm{SWAP} = \sum_{i,j=1}^d \ket{i}\ket{j}\bra{j}\bra{i} =
  $$

  ![Tensor diagram: two crossing lines, the leg i at top left goes to j at top right and the leg j at bottom left goes to i at bottom right](../../../assets/figures/L13-p12-4.png "w=182")

- Vectorization turns a matrix $X$ into a vector $\mathrm{vec}(X)$ by replacing $\bra{j}$ with $\ket{j}$. In the picture, the right leg of $X$ bends around so that both legs point left:

  $$
  X = \sum_{i,j=1}^d x_{ij}\ket{i}\!\bra{j} =
  $$

  ![Tensor diagram: box X with leg i on the left and leg j on the right](../../../assets/figures/L13-p12-5.png "w=129")

  $$
  \mathrm{vec}(X) = \sum_{i,j=1}^d x_{ij}\ket{i}\ket{j} =
  $$

  ![Tensor diagram: box X with leg i on the left, its right leg bent around below so that the second leg j also points to the left](../../../assets/figures/L13-p12-6.png "w=161")

- A box can also *slide* around the bend to the other strand, where it becomes its transpose:

  $$
  \mathrm{vec}(X) =
  $$

  ![Tensor diagram: vec(X) as box X with its right leg bent around below, equals a box X^T with its legs looped around it, equals a box X^T on the lower strand with the strands joined at the right](../../../assets/figures/L13-p12-7.png "w=504")

- Sliding $B$ to the top strand gives the vectorization identity:

  $$
  (A \otimes B)\,\mathrm{vec}(X) = \mathrm{vec}(AXB^\mathsf{T})
  $$

  ![Tensor diagram: boxes A and X on the top strand and B on the bottom strand joined at the right, equals boxes A, X, B^T on the top strand with the bottom strand joined at the right](../../../assets/figures/L13-p12-8.png "w=484")

## Purification

Given a mixed state $\rho_A$, we want to find a pure state $\ket{\Psi}_{AB}$ such that [discarding](/notes/quantum-operations/#reduced-state) the B system produces $\rho_A$:

$$
\Tr_B(\ket{\Psi}\!\bra{\Psi}_{AB}) = \rho_A
$$

Such a state $\ket{\Psi}_{AB}$ is called a **purification** of $\rho_A$.

:::example

The maximally entangled state

$$
\ket{\beta}_{AB} = \frac{1}{\sqrt{d}}\ket{\Phi} = \frac{1}{\sqrt{d}}\sum_{i=1}^d \ket{i}\ket{i}
$$

is a purification of the maximally mixed state $I/d$, since

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

You can verify that $\sqrt{\rho}\sqrt{\rho} = \rho$ and that

$$
\ket{\Psi}_{AB} := (\sqrt{\rho_A} \otimes I_B)\ket{\Phi}_{AB}
$$

is a purification of $\rho_A$.

## Bell states and Pauli matrices

The [Bell states](/notes/superdense-coding/#bell-states) are related to the Pauli matrices by the following local conversion identities:

$$
\ket{\beta_{zx}} = \frac{1}{\sqrt{2}}\mathrm{vec}(Z^z X^x) \qquad \forall z, x \in \{0,1\}
$$

![Tensor diagram: triangle beta_zx with two legs on the left equals 1/sqrt2 times boxes Z^z and X^x on the top strand with the strands joined at the right, equals 1/sqrt2 times boxes X^x and Z^z on the bottom strand](../../../assets/figures/L13-p14-1.png "w=469")

The second equality follows by sliding, since $Z^\mathsf{T} = Z$ and $X^\mathsf{T} = X$.

## Teleportation

Here is how you can derive and analyze the [teleportation protocol](/notes/teleportation/#quantum-teleportation) with diagrams. Alice has an unknown state $\ket{\psi}_{A'} \in \C^2$ and shares the EPR state $\frac{1}{\sqrt{2}}(\ket{00} + \ket{11})_{AB} = \frac{1}{\sqrt{2}}\ket{\Phi}_{AB}$ with Bob. Suppose she measures her systems $A'A$ in the Bell basis and gets the outcome 00, which corresponds to the EPR state $\ket{\beta_{00}} = \frac{1}{\sqrt{2}}\ket{\Phi}$. Then Bob's state is $\ket{\psi}_B$:

![Teleportation diagram, time running right to left: 1/2 times a triangle psi on Bob's strand equals 1/sqrt2 times the state psi on A' and the cup joining A and B shared with 1/sqrt2, with a dashed line separating Alice (top) and Bob (bottom)](../../../assets/figures/L13-p14-2.png "w=720")

Bob's state comes with a factor $\frac{1}{2}$, so this happens with probability $\left(\frac{1}{2}\right)^2 = \frac{1}{4}$.

::pagebreak{lecture="13" page="15"}

More generally, if Alice gets outcomes $z, x \in \{0,1\}$, she sends them to Bob, who needs to apply the Pauli correction operator $Z^z X^x$:

![Teleportation diagram with Pauli correction: Alice's outcome beta_zx is sent to Bob who applies Z^z and X^x on his strand B, shown with the state psi on A', boxes X^x and Z^z on the cup between A and B, and 1/sqrt2 factors](../../../assets/figures/L13-p15-1.png "w=695")

This reproduces the correct state $\ket{\psi}$:

![Tensor diagram: triangle psi equals the chain Z^z, X^x, X^x, Z^z followed by triangle psi](../../../assets/figures/L13-p15-2.png "w=603")

The Pauli matrices cancel in pairs because $X^0 = X^2 = I = Z^0 = Z^2$.

Graphical notation, or tensor networks, is not only a fun theoretical tool but also has important practical applications. One of them is the [simulation of quantum circuits](/notes/circuit-simulation/) on classical computers, as in Cirq.

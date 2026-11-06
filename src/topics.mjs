// Single source of truth for how the lecture notes and exercise sheets are organised by topic.
// Used by astro.config.mjs (sidebar) and scripts/assemble.mjs (page generation).
//
// Notes sections are referenced by their `##` heading in transcripts/lectures/LNN.md:
//   { lecture: 1, from: 'Complex numbers', to: 'Arithmetic of' }   inclusive range (heading prefixes)
//   { lecture: 1, sections: ['Main directions'] }                     explicit list
//   { lecture: 3, intro: true, heading: 'Overview' }                  unheaded opening text of a lecture
//                                                                     (heading: null → no heading)
// Exercises are referenced as { sheet: 1, ex: [1, 2] } or { sheet: 13, sections: ['Dictionary'] }.

export const lectures = {
	1: 'Probabilistic bits, complex numbers and qubits',
	2: 'Linear algebra',
	3: 'The postulates of quantum mechanics',
	4: 'Quantum gates, circuits and algorithms',
	5: "Reversible computation, oracles and Deutsch's algorithm",
	6: 'Deutsch–Jozsa, Bernstein–Vazirani and Simon',
	7: 'Quantum communication: superdense coding and teleportation',
	8: 'Non-locality and entanglement: GHZ and CHSH games',
	9: "Grover's algorithm and quantum compiling",
	10: 'Phase estimation and the quantum Fourier transform',
	11: "Order finding, period finding and factoring",
	12: 'Quantum error correction',
	13: 'Mixed states and graphical notation',
};

export const parts = [
	{
		slug: 'foundations',
		label: 'Foundations',
		summary: 'Probabilistic bits, complex numbers, and the qubit.',
		topics: [
			{
				slug: 'introduction',
				title: 'About the course',
				description: 'Contents, main directions and motivation of the course.',
				notes: [{ lecture: 1, intro: true, heading: null }, { lecture: 1, sections: ['Main directions', 'Motivation'] }],
			},
			{
				slug: 'probabilistic-bits',
				title: 'Probabilistic bits',
				description: 'Probabilistic bits, operations on them, and measurement.',
				notes: [{ lecture: 1, from: 'Probabilistic bits (closest', to: 'Measuring a probabilistic bit' }],
			},
			{
				slug: 'complex-numbers',
				title: 'Complex numbers',
				description: 'Algebraic and exponential form, geometry and arithmetic of ℂ.',
				notes: [{ lecture: 1, from: 'Complex numbers', to: 'Arithmetic of' }],
			},
			{
				slug: 'qubits',
				title: 'Qubits and the Bloch sphere',
				description: 'Qubit states, measurement, qubit operations, phases and the Bloch sphere.',
				notes: [{ lecture: 1, from: 'Quantum bits (qubits)', to: 'Bloch sphere' }],
			},
		],
		exercises: [
			{ topic: 'probabilistic-bits', items: [{ sheet: 1, ex: [1, 2] }] },
			{ topic: 'complex-numbers', items: [{ sheet: 1, ex: [3, 4, 5, 6] }] },
			{ topic: 'qubits', items: [{ sheet: 1, ex: [7, 8, 9] }] },
		],
	},
	{
		slug: 'linear-algebra',
		label: 'Linear algebra',
		summary: 'Matrices, Dirac notation, eigenvalues and the tensor product.',
		topics: [
			{
				slug: 'matrices-and-vectors',
				title: 'Matrices and vectors',
				description: 'Matrices, basic matrix operations, vectors and matrix multiplication.',
				notes: [{ lecture: 2, intro: true, heading: null }, { lecture: 2, from: 'Matrices', to: 'Properties of matrix multiplication' }],
			},
			{
				slug: 'dirac-notation',
				title: 'Dirac notation, inner products and bases',
				description: 'Bra-ket notation, inner and outer products, norms, projectors and bases.',
				notes: [{ lecture: 2, from: 'Dirac bra-ket notation', to: 'Standard basis' }],
			},
			{
				slug: 'eigenvalues-and-special-matrices',
				title: 'Eigenvalues and special matrices',
				description: 'Eigenvalues, diagonal representation, normal, Hermitian and unitary matrices.',
				notes: [{ lecture: 2, from: 'Eigenvalues and eigenvectors', to: 'Normal, Hermitian and unitary matrices' }],
			},
			{
				slug: 'tensor-product',
				title: 'Tensor product',
				description: 'The tensor (Kronecker) product of vectors and matrices.',
				notes: [{ lecture: 2, sections: ['Tensor product'] }],
			},
		],
		exercises: [
			{ topic: 'dirac-notation', items: [{ sheet: 2, ex: [1, 2] }] },
			{ topic: 'matrices-and-vectors', items: [{ sheet: 2, ex: [3] }] },
			{ topic: 'eigenvalues-and-special-matrices', items: [{ sheet: 2, ex: [4, 5, 6] }] },
			{ topic: 'tensor-product', items: [{ sheet: 2, ex: [7] }] },
		],
	},
	{
		slug: 'postulates',
		label: 'Quantum mechanics',
		summary: 'The rules of the game: states, evolution, measurement and composite systems.',
		topics: [
			{
				slug: 'postulates',
				title: 'The postulates of quantum mechanics',
				description: 'The rules of the game for probabilistic bits and for qubits.',
				notes: [{ lecture: 3, intro: true, heading: null }, { lecture: 3, from: 'Probabilistic bits: rules', to: 'A few words about physics' }],
			},
			{
				slug: 'change-of-basis',
				title: 'Change of basis and measurement',
				description: 'Expressing states and matrices in a different basis, and measuring in any orthonormal basis.',
				notes: [{ lecture: 3, from: 'Expressing a state in a different basis', to: 'Measurement in a different basis' }],
			},
			{
				slug: 'composite-systems',
				title: 'Composite systems and entanglement',
				description: 'The computational basis, correlated and product distributions, entangled states, partial measurement.',
				notes: [{ lecture: 3, from: 'Tensor product and the computational basis', to: 'Measuring one out of two qubits' }],
			},
		],
		exercises: [
			{ topic: 'change-of-basis', items: [{ sheet: 3, ex: [1, 2, 3] }] },
			{ topic: 'composite-systems', items: [{ sheet: 3, ex: [4, 6] }] },
			{ topic: 'postulates', items: [{ sheet: 3, ex: [5] }] },
		],
	},
	{
		slug: 'circuits',
		label: 'Quantum circuits',
		summary: 'Gates, circuits, reversible computation, oracles and compiling.',
		topics: [
			{
				slug: 'quantum-gates',
				title: 'Quantum gates',
				description: 'Logical gates, single- and multi-qubit quantum gates, and local operations.',
				notes: [{ lecture: 4, intro: true, heading: 'Logical gates' }, { lecture: 4, from: 'Single-qubit gates', to: 'Local operations' }],
			},
			{
				slug: 'quantum-circuits',
				title: 'Measurements, circuits and algorithms',
				description: 'Measurements, quantum circuits, locality and uniformity, and what a quantum algorithm is.',
				notes: [{ lecture: 4, from: 'Single- and multi-qubit measurements', to: 'Quantum algorithm' }],
			},
			{
				slug: 'reversible-computation',
				title: 'Reversible computation and oracles',
				description: 'Reversibility, controlled gates, the Toffoli gate, uncomputing trash and phase kick-back.',
				notes: [{ lecture: 5, intro: true, heading: null }, { lecture: 5, from: 'Quantum AND?', to: 'Phase kick-back' }],
			},
			{
				slug: 'quantum-compiling',
				title: 'Quantum compiling',
				description: 'Decomposing an arbitrary unitary into Givens rotations, CNOTs and single-qubit gates.',
				notes: [{ lecture: 9, sections: ['Quantum compiling'] }],
			},
		],
		exercises: [
			{ topic: 'quantum-gates', items: [{ sheet: 4, ex: [1, 2, 3, 4, 5] }, { sheet: 5, ex: [1, 2, 4] }] },
			{ topic: 'reversible-computation', items: [{ sheet: 5, ex: [3, 7, 8] }] },
			{ topic: 'quantum-compiling', items: [{ sheet: 9, ex: [3, 4, 5, 8] }] },
		],
	},
	{
		slug: 'entanglement',
		label: 'Entanglement and communication',
		summary: 'Bell states, superdense coding, teleportation, non-local games and observables.',
		topics: [
			{
				slug: 'superdense-coding',
				title: 'Bell states and superdense coding',
				description: 'The one-time pad, local versus global operations, Bell states and superdense coding.',
				notes: [{ lecture: 7, intro: true, heading: null }, { lecture: 7, from: 'One-time pad', to: 'Superdense coding' }],
			},
			{
				slug: 'teleportation',
				title: 'Quantum teleportation',
				description: 'The one-time pad with probabilistic bits and its quantum analogue, teleportation.',
				notes: [{ lecture: 7, from: 'One-time pad with probabilistic bits', to: 'Quantum teleportation' }],
			},
			{
				slug: 'non-local-games',
				title: 'Non-locality: GHZ and CHSH games',
				description: 'Quantum correlations, non-locality, and the GHZ and CHSH games.',
				notes: [{ lecture: 8, from: 'Quantum non-locality and entanglement', to: 'CHSH game' }],
			},
			{
				slug: 'observables',
				title: 'Observables',
				description: 'Observables, their measurement, and a circuit for measuring an observable.',
				notes: [{ lecture: 8, from: 'Observables', to: 'Quantum circuit for measuring an observable' }],
			},
		],
		exercises: [
			{ topic: 'superdense-coding', items: [{ sheet: 7, ex: [1, 2, 3] }, { sheet: 8, ex: [4] }] },
			{ topic: 'teleportation', items: [{ sheet: 7, ex: [4, 5, 6] }] },
			{ topic: 'non-local-games', items: [{ sheet: 8, ex: [1, 2, 3, 5, 6, 7] }] },
		],
	},
	{
		slug: 'algorithms',
		label: 'Quantum algorithms',
		summary: 'Deutsch, Deutsch–Jozsa, Bernstein–Vazirani, Simon and Grover.',
		topics: [
			{
				slug: 'deutsch',
				title: "Deutsch's algorithm",
				description: "Computing the XOR of f(0) and f(1) with a single query, and interference.",
				notes: [{ lecture: 5, from: "Deutsch's algorithm for XOR", to: "Deutsch's algorithm (full version)" }],
			},
			{
				slug: 'deutsch-jozsa-bernstein-vazirani',
				title: 'Deutsch–Jozsa and Bernstein–Vazirani',
				description: 'The Hadamard transform, the Deutsch–Jozsa algorithm and the Bernstein–Vazirani problem.',
				notes: [{ lecture: 6, intro: true, heading: null }, { lecture: 6, from: 'Hadamard transform', to: 'Bernstein-Vazirani problem' }],
			},
			{
				slug: 'simon',
				title: "Simon's algorithm",
				description: "Simon's algorithm and a comparison of the three query algorithms.",
				notes: [{ lecture: 6, from: "Simon's algorithm", to: 'Comparison of the three algorithms' }],
			},
			{
				slug: 'grover',
				title: "Grover's algorithm",
				description: "Unstructured search, Grover's algorithm, its analysis and implementation.",
				notes: [{ lecture: 9, intro: true, heading: 'The search problem' }, { lecture: 9, from: "Grover's algorithm", to: 'Special trick for' }],
			},
		],
		exercises: [
			{ topic: 'deutsch', items: [{ sheet: 5, ex: [5, 6] }] },
			{ topic: 'deutsch-jozsa-bernstein-vazirani', items: [{ sheet: 6, ex: [1, 2, 3, 4, 5, 6] }] },
			{ topic: 'grover', items: [{ sheet: 9, ex: [1, 2, 6, 7] }] },
		],
	},
	{
		slug: 'shor',
		label: "Fourier transform and Shor's algorithm",
		summary: 'Phase estimation, the quantum Fourier transform, and factoring via period finding.',
		topics: [
			{
				slug: 'phase-estimation',
				title: 'Quantum phase estimation',
				description: "The road to Shor's algorithm, eigenvectors, and quantum phase estimation.",
				notes: [{ lecture: 10, intro: true, heading: null }, { lecture: 10, sections: ['Quantum phase estimation'] }],
			},
			{
				slug: 'fourier-transform',
				title: 'Quantum Fourier transform',
				description: 'The quantum Fourier transform, its circuit, and the discrete Fourier transform.',
				notes: [{ lecture: 10, from: 'Quantum Fourier transform', to: 'Discrete Fourier transform' }],
			},
			{
				slug: 'number-theory',
				title: 'Number theory toolkit',
				description: 'The extended Euclidean algorithm, multiplicative inverses and multiplicative order.',
				notes: [{ lecture: 11, intro: true, heading: null }, { lecture: 11, from: 'Extended Euclidean algorithm', to: 'Multiplicative order' }],
			},
			{
				slug: 'factoring',
				title: 'Factoring via order finding',
				description: 'The factoring and order finding problems, and how to factor using order finding.',
				notes: [{ lecture: 11, from: 'Factoring and order finding problems', to: 'Order finding = Period finding' }],
			},
			{
				slug: 'period-finding',
				title: 'Period finding',
				description: 'The quantum algorithm for period finding.',
				notes: [{ lecture: 11, from: 'Period finding', to: 'Algorithm' }],
			},
		],
		exercises: [
			{ topic: 'fourier-transform', items: [{ sheet: 10, ex: [1, 2, 3, 4, 5] }, { sheet: 11, ex: [4] }] },
			{ topic: 'phase-estimation', items: [{ sheet: 11, ex: [5] }] },
			{ topic: 'number-theory', items: [{ sheet: 11, ex: [1, 2] }] },
			{ topic: 'factoring', items: [{ sheet: 11, ex: [3, 6] }] },
		],
	},
	{
		slug: 'error-correction',
		label: 'Error correction',
		summary: 'Repetition codes, quantum error correction and the Steane code.',
		topics: [
			{
				slug: 'classical-error-correction',
				title: 'Error correction for bits',
				description: 'The repetition code, the problem setup, obstacles, and error correction for probabilistic bits.',
				notes: [{ lecture: 12, intro: true, heading: null }, { lecture: 12, from: 'Classical repetition code', to: 'Error correction for probabilistic bits' }],
			},
			{
				slug: 'quantum-error-correction',
				title: 'Quantum error correction',
				description: 'Correcting arbitrary single-qubit errors by measuring syndromes.',
				notes: [{ lecture: 12, sections: ['Quantum error correction'] }],
			},
			{
				slug: 'steane-code',
				title: 'The Steane code',
				description: 'The 7-qubit Steane code and a remark on fault tolerance.',
				notes: [{ lecture: 12, from: 'Steane code', to: 'Fault tolerance' }],
			},
		],
		exercises: [
			{ topic: 'classical-error-correction', items: [{ sheet: 12, ex: [1, 2] }] },
			{ topic: 'quantum-error-correction', items: [{ sheet: 12, ex: [3, 4, 5] }] },
			{ topic: 'steane-code', items: [{ sheet: 12, ex: [6] }] },
		],
	},
	{
		slug: 'mixed-states',
		label: 'Mixed states and graphical notation',
		summary: 'Density matrices, quantum operations, graphical notation and circuit simulation.',
		topics: [
			{
				slug: 'density-matrices',
				title: 'Density matrices and mixed states',
				description: 'The density matrix, mixed states, the Bloch ball and mixed states of dimension d.',
				notes: [{ lecture: 13, intro: true, heading: null }, { lecture: 13, from: 'Density matrix', to: 'Mixed states of dimension d' }],
			},
			{
				slug: 'quantum-operations',
				title: 'Evolution, reduced states and quantum operations',
				description: 'Evolution of mixed states, the partial trace, and general quantum operations.',
				notes: [{ lecture: 13, from: 'Evolution of mixed states', to: 'General quantum operation' }],
			},
			{
				slug: 'graphical-notation',
				title: 'Graphical notation',
				description: 'Tensor-network diagrams, purification, Bell states and teleportation in pictures.',
				notes: [{ lecture: 13, from: 'Graphical notation', to: 'Teleportation' }],
			},
			{
				slug: 'circuit-simulation',
				title: 'Simulating quantum circuits',
				description: 'Naive simulation versus tensor networks, with example Python code.',
				notes: [{ lecture: 13, from: 'Simulation of quantum circuits', to: 'Example Python code' }],
			},
		],
		exercises: [
			{ topic: 'density-matrices', items: [{ sheet: 13, ex: [1] }] },
			{ topic: 'graphical-notation', items: [{ sheet: 13, sections: ['Dictionary', 'Elephant eaten by a snake'] }, { sheet: 13, ex: [2, 3, 4, 5, 6] }] },
		],
	},
];

/** Text shown before the snake exercises (the sheet's title footnote). */
export const sheetNotes = {
	13: 'No animals should be harmed during these exercises.',
};

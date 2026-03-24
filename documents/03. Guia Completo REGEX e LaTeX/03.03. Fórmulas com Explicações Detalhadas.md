# Guia Completo de Fórmulas com Explicações Detalhadas

## 📋 ÍNDICE
1. Matemática
2. Física
3. Química
4. Biologia
5. Ciência da Computação
6. Engenharia
7. Economia e Finanças
8. Astronomia
9. Farmacologia
10. Geografia
11. Música e Acústica

---

## 📐 MATEMÁTICA

### Álgebra Básica - Produtos Notáveis

**Quadrado da soma:**
- `(a + b)² = a² + 2ab + b²`
- a, b = quaisquer números/expressões

**Quadrado da diferença:**
- `(a - b)² = a² - 2ab + b²`

**Produto da soma pela diferença:**
- `(a + b)(a - b) = a² - b²`

**Cubo da soma:**
- `(a + b)³ = a³ + 3a²b + 3ab² + b³`

**Cubo da diferença:**
- `(a - b)³ = a³ - 3a²b + 3ab² - b³`

### Equação do 2º Grau

**Fórmula de Bhaskara:**
- `x = (-b ± √(b² - 4ac)) / 2a`
- x = raízes da equação
- a = coeficiente de x²
- b = coeficiente de x
- c = termo independente
- Equação: ax² + bx + c = 0

**Discriminante (Δ):**
- `Δ = b² - 4ac`
- Δ > 0: duas raízes reais distintas
- Δ = 0: duas raízes reais iguais
- Δ < 0: raízes complexas

**Relações de Girard:**
- Soma: `x₁ + x₂ = -b/a`
- Produto: `x₁ · x₂ = c/a`

### Geometria Plana - Áreas

**Quadrado:** `A = l²`
- A = área, l = lado

**Retângulo:** `A = b × h`
- b = base, h = altura

**Triângulo:** `A = (b × h) / 2`
- b = base, h = altura perpendicular

**Triângulo (Herão):** `A = √[s(s-a)(s-b)(s-c)]`
- s = (a+b+c)/2 = semiperímetro
- a, b, c = lados

**Círculo:** `A = πr²`
- π ≈ 3,14159, r = raio

**Trapézio:** `A = [(B + b) × h] / 2`
- B = base maior, b = base menor, h = altura

**Losango:** `A = (D × d) / 2`
- D = diagonal maior, d = diagonal menor

**Perímetro do círculo:** `C = 2πr = πd`
- d = diâmetro = 2r

**Teorema de Pitágoras:** `a² + b² = c²`
- a, b = catetos, c = hipotenusa

### Geometria Espacial - Volumes

**Cubo:** `V = a³`
- a = aresta

**Paralelepípedo:** `V = a × b × c`
- a, b, c = dimensões

**Prisma:** `V = Ab × h`
- Ab = área da base, h = altura

**Pirâmide:** `V = (Ab × h) / 3`

**Cilindro:** `V = πr²h`
- r = raio da base, h = altura

**Cone:** `V = (πr²h) / 3`

**Esfera:** `V = (4πr³) / 3`

**Áreas de superfície:**
- Cubo: `A = 6a²`
- Esfera: `A = 4πr²`
- Cilindro: `A = 2πr² + 2πrh`

### Trigonometria

**Relação fundamental:** `sen²θ + cos²θ = 1`

**Tangente:** `tan θ = sen θ / cos θ`

**Lei dos Senos:** `a/sen A = b/sen B = c/sen C = 2R`
- a, b, c = lados
- A, B, C = ângulos opostos
- R = raio da circunferência circunscrita

**Lei dos Cossenos:** `a² = b² + c² - 2bc·cos A`

**Valores notáveis:**
- sen 30° = 1/2, cos 30° = √3/2, tan 30° = √3/3
- sen 45° = √2/2, cos 45° = √2/2, tan 45° = 1
- sen 60° = √3/2, cos 60° = 1/2, tan 60° = √3

### Matemática Financeira

**Juros simples:**
- `J = C × i × t`
- `M = C(1 + it)`
- J = juro, C = capital, i = taxa, t = tempo, M = montante

**Juros compostos:** `M = C(1 + i)ⁿ`
- n = número de períodos

**Desconto simples:** `D = N × i × t`
- D = desconto, N = valor nominal

### Estatística

**Média aritmética:** `x̄ = Σx / n`
- x̄ = média, Σx = soma dos valores, n = quantidade

**Média ponderada:** `x̄ = Σ(x·p) / Σp`
- p = pesos

**Variância:** `σ² = Σ(x - x̄)² / n`
- σ² = variância

**Desvio padrão:** `σ = √[Σ(x - x̄)² / n]`

**Coeficiente de variação:** `CV = (σ / x̄) × 100%`

### Análise Combinatória

**Arranjo:** `Aₙ,ₚ = n! / (n-p)!`
- n = total, p = escolhidos, ordem importa

**Combinação:** `Cₙ,ₚ = n! / [p!(n-p)!]`
- ordem NÃO importa

**Permutação:** `Pₙ = n!`

**Permutação com repetição:** `Pₙ^(a,b,c) = n! / (a!·b!·c!)`

### Progressões

**PA - Termo geral:** `aₙ = a₁ + (n-1)r`
- aₙ = n-ésimo termo, a₁ = primeiro termo, r = razão, n = posição

**PA - Soma:** `Sₙ = n(a₁ + aₙ) / 2`

**PG - Termo geral:** `aₙ = a₁ · qⁿ⁻¹`
- q = razão

**PG - Soma finita:** `Sₙ = a₁(qⁿ - 1) / (q - 1)`

**PG - Soma infinita:** `S∞ = a₁ / (1 - q)` (|q| < 1)

### Cálculo - Derivadas

**Potência:** `d/dx(xⁿ) = n·xⁿ⁻¹`

**Produto:** `(f·g)' = f'g + fg'`

**Quociente:** `(f/g)' = (f'g - fg') / g²`

**Regra da cadeia:** `d/dx[f(g(x))] = f'(g(x))·g'(x)`

**Exponencial:** `d/dx(eˣ) = eˣ`

**Logaritmo:** `d/dx(ln x) = 1/x`

**Seno:** `d/dx(sen x) = cos x`

**Cosseno:** `d/dx(cos x) = -sen x`

### Cálculo - Integrais

**Potência:** `∫xⁿ dx = xⁿ⁺¹/(n+1) + C` (n ≠ -1)

**1/x:** `∫(1/x) dx = ln|x| + C`

**Exponencial:** `∫eˣ dx = eˣ + C`

**Integral definida:** `∫ₐᵇ f(x)dx = F(b) - F(a)`
- F(x) = primitiva de f(x)

---

## ⚛️ FÍSICA

### Cinemática - MRU

**Velocidade média:** `v = Δs / Δt`
- v = velocidade, Δs = deslocamento, Δt = tempo

**Função horária:** `s = s₀ + vt`
- s = posição, s₀ = posição inicial, t = tempo

### Cinemática - MRUV

**Aceleração:** `a = Δv / Δt`
- a = aceleração, Δv = variação de velocidade

**Velocidade:** `v = v₀ + at`
- v₀ = velocidade inicial

**Posição:** `s = s₀ + v₀t + at²/2`

**Torricelli:** `v² = v₀² + 2aΔs`

**Queda livre:**
- `h = gt²/2` (velocidade inicial zero)
- `v = √(2gh)` (velocidade final)
- g ≈ 9,8 m/s² ou 10 m/s²

### Movimento Circular

**Velocidade angular:** `ω = Δθ / Δt = 2π/T`
- ω = velocidade angular (rad/s)
- θ = ângulo (rad), T = período

**Velocidade linear:** `v = ωr`
- r = raio

**Aceleração centrípeta:** `acp = v²/r = ω²r`

**Frequência:** `f = 1/T` (Hz)

### Dinâmica

**2ª Lei de Newton:** `F = ma`
- F = força (N), m = massa (kg), a = aceleração (m/s²)

**Peso:** `P = mg`
- g = gravidade

**Atrito:** `Fat = μN`
- μ = coeficiente de atrito, N = força normal

**Lei de Hooke:** `F = kx`
- k = constante elástica (N/m), x = deformação (m)

**Impulso:** `I = FΔt = Δ(mv)`

**Quantidade de movimento:** `Q = mv`

**Conservação:** `m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'`

### Trabalho e Energia

**Trabalho:** `W = F·d·cos θ`
- W = trabalho (J), F = força (N), d = deslocamento (m), θ = ângulo

**Potência:** `P = W/t` ou `P = F·v`
- P = potência (W = watt)

**Energia cinética:** `Ec = mv²/2`

**Energia potencial gravitacional:** `Epg = mgh`
- h = altura

**Energia potencial elástica:** `Epe = kx²/2`

**Teorema do trabalho:** `W = ΔEc`

**Conservação:** `Em = Ec + Ep = constante`

### Gravitação

**Lei da Gravitação:** `F = G(m₁m₂)/r²`
- G = 6,67×10⁻¹¹ N·m²/kg²

**Aceleração gravitacional:** `g = GM/R²`
- M = massa do planeta, R = raio

**Velocidade orbital:** `v = √(GM/r)`

**3ª Lei de Kepler:** `T²/R³ = constante`
- T = período, R = raio da órbita

### Hidrostática

**Pressão:** `P = F/A`
- P = pressão (Pa), A = área (m²)

**Pressão hidrostática:** `P = ρgh`
- ρ = densidade (kg/m³), h = profundidade

**Stevin:** `P₂ = P₁ + ρgh`

**Pascal:** `F₁/A₁ = F₂/A₂`

**Empuxo:** `E = ρ_fluido · V_deslocado · g`

### Hidrodinâmica

**Continuidade:** `A₁v₁ = A₂v₂`
- A = área da seção, v = velocidade

**Bernoulli:** `P + ρgh + ρv²/2 = constante`

### Termodinâmica

**Dilatação linear:** `ΔL = L₀·α·ΔT`
- α = coeficiente de dilatação linear, ΔT = variação temperatura

**Dilatação superficial:** `ΔA = A₀·β·ΔT` (β = 2α)

**Dilatação volumétrica:** `ΔV = V₀·γ·ΔT` (γ = 3α)

**Calor sensível:** `Q = mcΔT`
- Q = calor (J ou cal), m = massa, c = calor específico

**Calor latente:** `Q = mL`
- L = calor latente

**1ª Lei:** `ΔU = Q - W`
- ΔU = variação energia interna

**Gases ideais:** `PV = nRT`
- P = pressão, V = volume, n = mols, R = 8,31 J/(mol·K) ou 0,082 atm·L/(mol·K), T = temperatura (K)

**Energia interna (gás monoatômico):** `U = (3/2)nRT`

**Rendimento:** `η = W/Q_quente = 1 - Q_frio/Q_quente`

**Carnot:** `η_Carnot = 1 - T_fria/T_quente` (K)

### Ondas

**Equação fundamental:** `v = λf`
- v = velocidade (m/s), λ = comprimento de onda (m), f = frequência (Hz)

**Período:** `T = 1/f`

**Frequência fundamental (corda):** `f₁ = v/(2L)`

**Harmônicos:** `fₙ = nf₁`

**Efeito Doppler:** `f' = f·(v ± v_obs)/(v ∓ v_fonte)`
- + no numerador: observador aproxima
- - no denominador: fonte aproxima

**Intensidade sonora:** `I = P/A` (W/m²)

**Nível sonoro:** `β = 10·log(I/I₀)` dB
- I₀ = 10⁻¹² W/m²

**Batimento:** `f_bat = |f₁ - f₂|`

### Óptica

**Reflexão:** `θᵢ = θᵣ`

**Snell:** `n₁·sen θ₁ = n₂·sen θ₂`
- n = índice de refração

**Espelhos/Lentes:** `1/f = 1/p + 1/p'`
- f = foco, p = objeto, p' = imagem

**Aumento:** `A = -p'/p = i/o`

**Vergência:** `V = 1/f` (di = dioptria)
- f em metros

### Eletrostática

**Coulomb:** `F = k·q₁q₂/r²`
- k = 9×10⁹ N·m²/C²

**Campo elétrico:** `E = F/q` ou `E = k·Q/r²`

**Potencial:** `V = k·Q/r`

**Trabalho:** `W = q·ΔV`

**Energia potencial:** `Ep = k·q₁q₂/r`

**Capacitância:** `C = Q/V` (F = farad)

**Energia no capacitor:** `E = QV/2 = CV²/2`

**Capacitores:**
- Série: `1/Ceq = 1/C₁ + 1/C₂ + ...`
- Paralelo: `Ceq = C₁ + C₂ + ...`

### Eletrodinâmica

**Corrente:** `i = Q/Δt` (A = ampère)

**Lei de Ohm:** `V = R·i`
- V = tensão (V), R = resistência (Ω), i = corrente (A)

**2ª Lei de Ohm:** `R = ρ·L/A`
- ρ = resistividade

**Potência:** `P = V·i = Ri² = V²/R` (W)

**Energia:** `E = P·t`

**Resistores:**
- Série: `Req = R₁ + R₂ + ...`
- Paralelo: `1/Req = 1/R₁ + 1/R₂ + ...`

**Kirchhoff:**
- Nós: `Σi_entrada = Σi_saída`
- Malhas: `Σε = ΣR·i`

### Eletromagnetismo

**Força em carga:** `F = qvB·sen θ`
- B = campo magnético (T = tesla)

**Força em condutor:** `F = BiL·sen θ`

**Campo em fio:** `B = μ₀i/(2πr)`
- μ₀ = 4π×10⁻⁷ T·m/A

**Campo em espira:** `B = μ₀i/(2R)`

**Campo em solenoide:** `B = μ₀ni`
- n = espiras/comprimento

**Fluxo magnético:** `Φ = B·A·cos θ` (Wb = weber)

**Lei de Faraday:** `ε = -ΔΦ/Δt` ou `ε = -N·ΔΦ/Δt`

### Física Moderna

**Energia do fóton:** `E = hf = hc/λ`
- h = 6,63×10⁻³⁴ J·s (constante de Planck)
- c = 3×10⁸ m/s

**Efeito fotoelétrico:** `Ec_máx = hf - Φ`
- Φ = função trabalho

**Einstein:** `E = mc²`

**Energia relativística:** `E² = (pc)² + (mc²)²`

**Dilatação temporal:** `Δt' = Δt/√(1 - v²/c²)`

**Contração espacial:** `L' = L·√(1 - v²/c²)`

**De Broglie:** `λ = h/(mv)`

---

## 🧪 QUÍMICA

### Estequiometria

**Número de mols:** `n = m/M`
- n = mols, m = massa (g), M = massa molar (g/mol)

**Avogadro:** `n = N/Nₐ`
- N = número de partículas, Nₐ = 6,02×10²³ mol⁻¹

**Volume molar (CNTP):** `V = 22,4n` L

**Clapeyron:** `PV = nRT`

**Densidade de gases:** `d = m/V = PM/(RT)`

### Soluções

**Molaridade:** `M = n/V` (mol/L)

**Concentração comum:** `C = m/V` (g/L)

**Título:** `T = m_soluto/m_solução`

**ppm:** `ppm = (m_soluto/m_solução) × 10⁶`

**Fração molar:** `X = n_componente/n_total`

**Diluição:** `C₁V₁ = C₂V₂`

**Molalidade:** `W = n_soluto/m_solvente` (mol/kg)

### Termoquímica

**Entalpia:** `ΔH = H_produtos - H_reagentes`
- ΔH < 0: exotérmica
- ΔH > 0: endotérmica

**Lei de Hess:** `ΔH_total = ΔH₁ + ΔH₂ + ...`

**Energia de ligação:** `ΔH = Σ(quebradas) - Σ(formadas)`

**Entalpia de formação:** `ΔH°_reação = ΣΔH°f(produtos) - ΣΔH°f(reagentes)`

**Gibbs:** `ΔG = ΔH - TΔS`
- ΔG < 0: espontânea

### Cinética

**Velocidade:** `v = Δ[concentração]/Δt`

**Lei de velocidade:** `v = k[A]ᵃ[B]ᵇ`
- k = constante, a,b = ordens

**Arrhenius:** `k = A·e^(-Ea/RT)`
- Ea = energia de ativação

**Meia-vida (1ª ordem):** `t₁/₂ = 0,693/k`

### Equilíbrio

**Constante:** `Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ`
- Para: aA + bB ⇌ cC + dD

**Relação Kp e Kc:** `Kp = Kc(RT)^Δn`

**Quociente:** `Q` (mesma forma, qualquer momento)
- Q < K: → produtos
- Q > K: → reagentes
- Q = K: equilíbrio

**Grau de ionização:** `α = n_ionizado/n_inicial`

**Ostwald:** `α = √(Ka/M)`

### Equilíbrio Iônico

**Produto iônico da água:** `Kw = [H⁺][OH⁻] = 10⁻¹⁴` (25°C)

**pH:** `pH = -log[H⁺]`

**pOH:** `pOH = -log[OH⁻]`

**Relação:** `pH + pOH = 14`

**Ka:** `Ka = [H⁺][A⁻]/[HA]`

**Kb:** `Kb = [HB⁺][OH⁻]/[B]`

**Relação:** `Ka × Kb = Kw`

**Henderson-Hasselbalch:** `pH = pKa + log([A⁻]/[HA])`

**Kps:** `Kps = [cátion]ᵃ[ânion]ᵇ`

### Eletroquímica

**Potencial padrão:** `E°_célula = E°_cátodo - E°_ânodo`

**Nernst:** `E = E° - (0,059/n)·log Q` (25°C)

**Energia livre:** `ΔG° = -nFE°`
- F = 96500 C/mol

**Faraday:** `m = (M·i·t)/(n·F)`

### Radioatividade

**Desintegração:** `N = N₀·e^(-λt)`
- λ = constante de desintegração

**Meia-vida:** `t₁/₂ = 0,693/λ`

**Atividade:** `A = λN = A₀·e^(-λt)`

---

## 🧬 BIOLOGIA

### Genética

**Mendel 1ª Lei:** 3:1 (fenotípico), 1:2:1 (genotípico)

**Mendel 2ª Lei:** 9:3:3:1

**Hardy-Weinberg:**
- Alelos: `p + q = 1`
- Genótipos: `p² + 2pq + q² = 1`

**Recombinação:** `VR = (n_recombinantes/n_total) × 100%`

### Bioquímica

**Respiração:** `C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP`

**Fotossíntese:** `6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂`

**Fermentação alcoólica:** `C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP`

**Fermentação láctica:** `C₆H₁₂O₆ → 2C₃H₆O₃ + 2 ATP`

**Código genético:** 3 nucleotídeos = 1 códon = 1 aminoácido

### Ecologia

**Taxa de natalidade:** `n = (nascimentos/população) × 1000`

**Taxa de mortalidade:** `m = (mortes/população) × 1000`

**Crescimento exponencial:** `dN/dt = rN`

**Crescimento logístico:** `dN/dt = rN(K-N)/K`
- K = capacidade de suporte

**Densidade:** `D = N/A`

**PPL:** `PPL = PPB - R`
- PPL = produtividade primária líquida
- PPB = bruta, R = respiração

**Eficiência energética:** `E = (energia_nível_n / energia_nível_n-1) × 100%`
- Geralmente 10%

### Fisiologia

**Débito cardíaco:** `DC = FC × VS`
- FC = frequência cardíaca (bpm)
- VS = volume sistólico (mL)

**PAM:** `PAM = PAD + (PAS - PAD)/3`
- PAM = pressão arterial média
- PAD = diastólica, PAS = sistólica

**IMC:** `IMC = massa / altura²` (kg/m²)

---

Este é o final da Parte 1. Continue para ver Ciência da Computação e demais áreas...
# Guia Completo de Fórmulas (Parte 2)

## 💻 CIÊNCIA DA COMPUTAÇÃO

### Complexidade Computacional

**Notações Big O:**
- `O(1)` = Constante: tempo independe do tamanho da entrada
- `O(log n)` = Logarítmica: busca binária
- `O(n)` = Linear: percorre todos elementos uma vez
- `O(n log n)` = Linearítmica: merge sort, quick sort médio
- `O(n²)` = Quadrática: bubble sort, dois loops aninhados
- `O(n³)` = Cúbica: três loops aninhados
- `O(2ⁿ)` = Exponencial: força bruta combinatória
- `O(n!)` = Fatorial: todas permutações
- n = tamanho da entrada

### Teoria da Informação

**Entropia de Shannon:**
- `H(X) = -Σ p(x)·log₂ p(x)`
- H(X) = entropia (bits)
- p(x) = probabilidade de x
- Σ = somatório sobre todos x
- Mede incerteza/informação

**Capacidade do Canal (Shannon-Hartley):**
- `C = B·log₂(1 + S/N)`
- C = capacidade (bits/segundo)
- B = largura de banda (Hz)
- S/N = relação sinal-ruído

**Informação Mútua:**
- `I(X;Y) = H(X) - H(X|Y)`
- Quanto Y informa sobre X

**Taxa de Compressão:**
- `RC = tamanho_comprimido / tamanho_original`
- RC < 1: houve compressão
- Exemplo: 0,5 = redução de 50%

### Estruturas de Dados

**Fator de Carga (Hash Table):**
- `α = n/m`
- α = fator de carga
- n = elementos armazenados
- m = tamanho da tabela
- Ideal: α < 0,7

**Altura de Árvore Binária Completa:**
- `h = log₂(n+1)` (arredondar para cima)
- h = altura, n = nós

**Nós em Árvore Binária Completa:**
- `n = 2^h - 1`

**Busca Binária:**
- Complexidade: `O(log₂ n)`
- Cada passo elimina metade

### Algoritmos de Ordenação

**Bubble Sort:**
- Melhor: O(n), Médio: O(n²), Pior: O(n²)
- Espaço: O(1)

**Selection Sort:**
- Todos casos: O(n²)
- Espaço: O(1)

**Insertion Sort:**
- Melhor: O(n), Médio: O(n²), Pior: O(n²)
- Espaço: O(1)

**Merge Sort:**
- Todos casos: O(n log n)
- Espaço: O(n)

**Quick Sort:**
- Melhor/Médio: O(n log n), Pior: O(n²)
- Espaço: O(log n)

**Heap Sort:**
- Todos casos: O(n log n)
- Espaço: O(1)

### Redes de Computadores

**Taxa de Transferência:**
- `T = Tamanho_dados / Tempo`
- T = taxa (bps, Mbps, Gbps)
- 1 byte = 8 bits

**Latência Total:**
- `L = L_propagação + L_transmissão + L_processamento + L_fila`
- L = latência total (ms)

**Tempo de Propagação:**
- `Tp = Distância / Velocidade_propagação`
- Velocidade ≈ 2×10⁸ m/s (cabo) ou 3×10⁸ m/s (vácuo)

**Tempo de Transmissão:**
- `Tt = Tamanho_dados / Taxa_transmissão`

**Utilização do Canal:**
- `U = Tt / (Tt + 2·Tp)`
- U = eficiência (0 a 1)
- Para protocolos stop-and-wait

**Throughput:**
- Quantidade real de dados transferidos/tempo

### Machine Learning

**Erro Quadrático Médio (MSE):**
- `MSE = (1/n)Σ(yᵢ - ŷᵢ)²`
- n = amostras
- yᵢ = valor real
- ŷᵢ = valor previsto

**Raiz do MSE:**
- `RMSE = √MSE`
- Mesma unidade dos dados

**Erro Absoluto Médio (MAE):**
- `MAE = (1/n)Σ|yᵢ - ŷᵢ|`
- Menos sensível a outliers

**Métricas de Classificação:**

**Acurácia:**
- `Acurácia = (VP + VN) / (VP + VN + FP + FN)`
- VP = verdadeiros positivos
- VN = verdadeiros negativos
- FP = falsos positivos
- FN = falsos negativos

**Precisão:**
- `Precisão = VP / (VP + FP)`
- Dos previstos como positivo, quantos eram

**Recall (Sensibilidade):**
- `Recall = VP / (VP + FN)`
- Dos realmente positivos, quantos acertou

**F1-Score:**
- `F1 = 2 × (Precisão × Recall) / (Precisão + Recall)`
- Média harmônica

**Regressão Linear:**
- `y = β₀ + β₁x + ε`
- β₀ = intercepto
- β₁ = coeficiente angular
- ε = erro

**Gradiente Descendente:**
- `θ = θ - α·∇J(θ)`
- θ = parâmetros
- α = taxa de aprendizado (learning rate)
- ∇J(θ) = gradiente da função custo

**Função Sigmóide:**
- `σ(x) = 1 / (1 + e⁻ˣ)`
- Saída entre 0 e 1
- Usada em redes neurais

**Função ReLU:**
- `f(x) = max(0, x)`
- Popular em redes neurais profundas

**Entropia Cruzada:**
- `H(p,q) = -Σ p(x)·log q(x)`
- p(x) = distribuição real
- q(x) = distribuição prevista
- Função de perda para classificação

**Perplexidade:**
- `PP = 2^H`
- H = entropia
- Métrica para modelos de linguagem

### Computação Gráfica

**Translação 2D:**
- `x' = x + tx`
- `y' = y + ty`
- tx, ty = deslocamentos

**Rotação 2D:**
- `x' = x·cos θ - y·sen θ`
- `y' = x·sen θ + y·cos θ`
- θ = ângulo de rotação

**Escala 2D:**
- `x' = sx·x`
- `y' = sy·y`
- sx, sy = fatores de escala

**Taxa de Quadros:**
- `FPS = Número_frames / Tempo_segundos`
- 60 FPS = padrão para jogos

**Resolução:**
- `Total_pixels = Largura × Altura`
- Full HD = 1920×1080 = 2.073.600 pixels

**Profundidade de Cor:**
- `Cores = 2^bits`
- 24 bits = 2²⁴ = 16.777.216 cores

**Razão de Aspecto:**
- `Aspecto = Largura / Altura`
- 16:9 = 1,78
- 4:3 = 1,33

### Processamento de Imagens

**Limiarização:**
- `g(x,y) = 1 se f(x,y) > T, senão 0`
- T = limiar (threshold)
- Converte em preto e branco

**Filtro de Média (3×3):**
- `g(x,y) = (1/9)Σf(x+i, y+j)`
- Suaviza/reduz ruído

**Gradiente (Sobel):**
- `G = √(Gx² + Gy²)`
- Detecção de bordas

**SNR (Sinal-Ruído):**
- `SNR = 10·log₁₀(P_sinal/P_ruído)` dB
- Maior = melhor qualidade

**PSNR:**
- `PSNR = 10·log₁₀(MAX²/MSE)` dB
- MAX = 255 para 8 bits
- Qualidade de compressão

---

## 🏗️ ENGENHARIA

### Resistência dos Materiais

**Tensão Normal:**
- `σ = F/A`
- σ = tensão (Pa, MPa)
- F = força (N)
- A = área (m²)

**Tensão de Cisalhamento:**
- `τ = V/A`
- τ = cisalhamento
- V = força cortante

**Deformação:**
- `ε = ΔL/L₀`
- ε = deformação (adimensional)
- ΔL = variação comprimento
- L₀ = comprimento original

**Lei de Hooke:**
- `σ = E·ε`
- E = módulo de Young (Pa)
- Válida na região elástica

**Coeficiente de Poisson:**
- `ν = -ε_transversal/ε_longitudinal`
- 0 ≤ ν ≤ 0,5

**Módulo de Cisalhamento:**
- `G = τ/γ`
- G = módulo de cisalhamento
- γ = deformação angular (rad)

**Relação entre Módulos:**
- `E = 2G(1 + ν)`

**Momento de Inércia:**
- Retângulo: `I = bh³/12`
- Círculo: `I = πr⁴/4`
- b = base, h = altura, r = raio

**Tensão de Flexão:**
- `σ = M·y/I`
- M = momento fletor (N·m)
- y = distância do eixo neutro
- I = momento de inércia

### Mecânica dos Fluidos

**Número de Reynolds:**
- `Re = ρvD/μ = vD/ν`
- Re < 2000: laminar
- 2000 < Re < 4000: transição
- Re > 4000: turbulento
- ρ = densidade, v = velocidade
- D = diâmetro, μ = viscosidade dinâmica
- ν = viscosidade cinemática = μ/ρ

**Número de Froude:**
- `Fr = v/√(gL)`
- Forças inerciais vs gravitacionais

**Número de Mach:**
- `Ma = v/c`
- c = velocidade do som
- Ma < 1: subsônico
- Ma = 1: sônico
- Ma > 1: supersônico

**Perda de Carga:**
- `hf = f·(L/D)·(v²/2g)`
- hf = perda (m)
- f = fator de atrito
- L = comprimento, D = diâmetro

**Fator de Atrito (Laminar):**
- `f = 64/Re`
- Válido Re < 2000

**Vazão:**
- `Q = A·v` (m³/s)

**Potência de Bomba:**
- `P = ρgQH/η`
- H = altura manométrica
- η = eficiência

### Termodinâmica de Engenharia

**Carnot:**
- `η_Carnot = 1 - T_fria/T_quente` (K)
- Eficiência máxima teórica

**COP Refrigerador:**
- `COP_ref = Q_frio/W`
- Quanto maior, melhor

**COP Bomba de Calor:**
- `COP_bc = Q_quente/W`

**Relação:**
- `COP_bc = COP_ref + 1`

**Entalpia:**
- `H = U + PV`
- U = energia interna
- P = pressão, V = volume

**Entropia:**
- `dS ≥ dQ/T`
- = para reversível
- > para irreversível

**Relação de Mayer:**
- `cp - cv = R`
- cp = calor específico pressão constante
- cv = calor específico volume constante
- R = constante do gás

**Razão de Calores:**
- `γ = cp/cv`
- γ ≈ 1,4 para ar
- γ = 1,67 para monoatômicos

### Eletrotécnica

**Potência Aparente:**
- `S = V·I` (VA)
- V = tensão eficaz (RMS)
- I = corrente eficaz

**Potência Ativa:**
- `P = V·I·cos φ` (W)
- cos φ = fator de potência

**Potência Reativa:**
- `Q = V·I·sen φ` (VAR)

**Triângulo:**
- `S² = P² + Q²`

**Fator de Potência:**
- `FP = cos φ = P/S`
- 0 ≤ FP ≤ 1
- FP = 1 ideal

**Impedância:**
- `Z = √(R² + X²)` (Ω)
- R = resistência
- X = reatância

**Reatância Indutiva:**
- `XL = ωL = 2πfL` (Ω)
- L = indutância (H)
- f = frequência (Hz)

**Reatância Capacitiva:**
- `XC = 1/(ωC) = 1/(2πfC)` (Ω)
- C = capacitância (F)

**Ressonância:**
- `f₀ = 1/(2π√(LC))`
- XL = XC em ressonância

**Transformador Ideal:**
- `V₁/V₂ = N₁/N₂ = I₂/I₁`
- N = número de espiras

### Circuitos CA

**Valor Eficaz (RMS):**
- `V_ef = V_máx/√2`
- `I_ef = I_máx/√2`
- √2 ≈ 1,414

**Valor Médio:**
- `V_méd = 2V_máx/π`
- Retificação onda completa

**Impedância Complexa:**
- `Z = R + jX`
- j = unidade imaginária

**Lei de Ohm (Fasores):**
- `V̅ = Z̅·I̅`
- Notação fasorial

---

## 💰 ECONOMIA E FINANÇAS

### Microeconomia

**Elasticidade-Preço:**
- `Ep = (ΔQ/Q) / (ΔP/P)`
- |Ep| > 1: elástica
- |Ep| < 1: inelástica
- |Ep| = 1: unitária

**Receita Total:**
- `RT = P × Q`
- P = preço, Q = quantidade

**Receita Marginal:**
- `RMg = ΔRT/ΔQ`
- Receita adicional por unidade

**Custo Marginal:**
- `CMg = ΔCT/ΔQ`
- Custo adicional por unidade

**Lucro:**
- `L = RT - CT`
- CT = custo total

**Maximização:**
- `RMg = CMg`
- Lucro máximo

### Macroeconomia

**PIB:**
- `PIB = C + I + G + (X - M)`
- C = consumo
- I = investimento
- G = governo
- X = exportações
- M = importações

**Taxa de Crescimento:**
- `g = [(PIB_final - PIB_inicial)/PIB_inicial] × 100%`

**PIB per Capita:**
- `PIB_pc = PIB/População`

**Inflação:**
- `Inflação = [(IPC_final - IPC_inicial)/IPC_inicial] × 100%`
- IPC = índice de preços

**Fisher (Taxa Real):**
- Aproximada: `r ≈ i - π`
- Exata: `1 + r = (1 + i)/(1 + π)`
- r = taxa real
- i = taxa nominal
- π = inflação

### Finanças

**VPL (Valor Presente Líquido):**
- `VPL = Σ[FC_t/(1+i)^t] - Investimento`
- FC_t = fluxo de caixa período t
- i = taxa de desconto
- VPL > 0: viável

**TIR (Taxa Interna de Retorno):**
- TIR torna VPL = 0
- TIR > custo capital: viável

**Índice de Lucratividade:**
- `IL = VPL/Investimento`
- IL > 0: viável

**CAPM:**
- `E(R) = Rf + β[E(Rm) - Rf]`
- E(R) = retorno esperado
- Rf = taxa livre risco
- β = beta (sensibilidade ao mercado)
- E(Rm) = retorno mercado

**Índice de Sharpe:**
- `S = (Rp - Rf)/σp`
- Rp = retorno portfólio
- σp = desvio padrão (risco)
- Maior = melhor

**Beta:**
- `β = Cov(Ri, Rm) / Var(Rm)`
- β = 1: igual ao mercado
- β > 1: mais volátil
- β < 1: menos volátil

### Investimentos

**Valor Futuro:**
- `VF = VP(1 + i)^n`

**Valor Presente:**
- `VP = VF/(1 + i)^n`

**Perpetuidade:**
- `VP = PMT/i`
- Série infinita pagamentos

**Anuidade:**
- `VP = PMT × [1 - (1+i)^(-n)] / i`
- Série finita pagamentos

**Taxa Equivalente:**
- `(1 + i_a) = (1 + i_p)^n`

**Retorno Total:**
- `R = (P_final - P_inicial + Dividendos) / P_inicial`

---

## 🌟 ASTRONOMIA

**Velocidade Orbital:**
- `v = √(GM/r)`
- G = 6,67×10⁻¹¹ N·m²/kg²

**Velocidade de Escape:**
- `v_e = √(2GM/R)`

**Energia Orbital:**
- `E = -GMm/(2a)`
- a = semieixo maior

**Magnitude:**
- `m - M = 5·log(d/10)`
- m = aparente
- M = absoluta
- d = distância (parsecs)

**Lei de Stefan-Boltzmann:**
- `L = 4πR²σT⁴`
- L = luminosidade (W)
- R = raio estrela
- σ = 5,67×10⁻⁸ W/(m²·K⁴)
- T = temperatura (K)

**Lei de Wien:**
- `λ_máx·T = 2,898×10⁻³` m·K
- Cor vs temperatura

**Lei de Hubble:**
- `v = H₀·d`
- v = velocidade recessão
- H₀ ≈ 70 km/s/Mpc
- Expansão do universo

**Redshift:**
- `z = Δλ/λ = v/c` (aproximado)

**Idade Universo:**
- `t ≈ 1/H₀ ≈ 13,8` bilhões anos

---

## 🏥 FARMACOLOGIA

**Biodisponibilidade:**
- `F = (AUC_oral × Dose_IV) / (AUC_IV × Dose_oral)`
- AUC = área sob curva
- F = 1: 100% biodisponível

**Volume Distribuição:**
- `Vd = Dose / C₀`
- Vd em litros

**Clearance:**
- `Cl = k·Vd = Dose/AUC` (L/h)

**Meia-Vida:**
- `t₁/₂ = 0,693/k` (h)

**Concentração:**
- `C = C₀·e^(-kt)`

**Dose Manutenção:**
- `DM = Cl·Css·τ/F`
- Css = concentração estado estacionário
- τ = intervalo doses

**Taxa Infusão:**
- `R = Cl·Css`

**Índice Terapêutico:**
- `IT = DL₅₀/DE₅₀`
- Alto = mais seguro

**Superfície Corporal:**
- `SC = √[(altura_cm × peso_kg)/3600]` m²

**Filtração Glomerular:**
- Homem: `ClCr = [(140-idade) × peso] / (72 × Creatinina)`
- Mulher: × 0,85

**Osmolaridade:**
- `Osm = 2Na + Glicose/18 + Ureia/6` mOsm/L

---

## 🏃 FISIOLOGIA DO EXERCÍCIO

**VO₂ máx (Cooper):**
- `VO₂máx = (Distância_m - 504,9)/44,73` mL/kg/min
- Distância em 12 minutos

**FC Máxima:**
- `FC_máx ≈ 220 - idade` bpm

**FC Reserva:**
- `FC_res = FC_máx - FC_repouso`

**Zona Treino:**
- `FC_treino = FC_repouso + (FC_res × intensidade%)`

**MET:**
- 1 MET = 3,5 mL O₂/kg/min
- Metabolismo basal

**Gasto Calórico:**
- `Cal = METs × peso_kg × tempo_h`

**IMC:**
- `IMC = massa_kg / altura_m²`
- < 18,5: baixo peso
- 18,5-24,9: normal
- 25-29,9: sobrepeso
- ≥ 30: obesidade

**RCQ:**
- `RCQ = cintura / quadril`
- Homem > 0,90: risco
- Mulher > 0,85: risco

---

## 🌍 GEOGRAFIA

**Escala:**
- `E = d_mapa/d_real`
- Ex: 1:50.000
- 1 cm mapa = 500 m real

**Distância Real:**
- `D = d_mapa/E`

**Declividade:**
- `i = (Δh/Δd) × 100%`
- Ou: `α = arctan(Δh/Δd)` graus

**Conversão Coordenadas:**
- `Decimal = Graus + Min/60 + Seg/3600`

**Distância Latitudes:**
- `d ≈ 111 km × Δlatitude`
- 1° ≈ 111 km

---

## 🎵 MÚSICA

**Velocidade Som:**
- `v ≈ 331 + 0,6T` m/s
- T = temperatura °C
- 20°C: v ≈ 343 m/s

**Intervalos:**
- Oitava: 2:1
- Quinta: 3:2
- Quarta: 4:3
- Terça maior: 5:4

**Temperamento Igual:**
- `f_n = f₀ × 2^(n/12)`
- n = semitons
- Lá = 440 Hz

**Cents:**
- `cents = 1200 × log₂(f₂/f₁)`
- 1 semitom = 100 cents

---

## 🎨 DESIGN

**Razão Áurea:**
- `φ = (1 + √5)/2 ≈ 1,618`

**Luminosidade RGB:**
- `Y = 0,299R + 0,587G + 0,114B`

**Contraste:**
- `Contraste = (L₁ + 0,05)/(L₂ + 0,05)`
- WCAG: ≥ 4,5:1 para texto

**Papel A-Series:**
- Razão: √2:1
- A4 = 210×297 mm

---

## 🔬 QUÍMICA AVANÇADA

**Schrödinger:**
- `Ĥψ = Eψ`
- Ĥ = Hamiltoniano
- ψ = função onda
- E = energia

**Energia Hidrogênio:**
- `E_n = -13,6/n²` eV
- n = 1, 2, 3...

**Heisenberg:**
- `Δx·Δp ≥ ℏ/2`
- ℏ = 1,055×10⁻³⁴ J·s
- Incerteza

**Rydberg:**
- `1/λ = R(1/n₁² - 1/n₂²)`
- R = 1,097×10⁷ m⁻¹

**Beer-Lambert:**
- `A = ε·c·l`
- A = absorbância
- ε = extinção molar
- c = concentração
- l = caminho óptico

**Transmitância:**
- `T = I/I₀`
- `A = -log T`

**Van der Waals:**
- `(P + a/V²)(V - b) = RT`
- Gases reais

---

## 📊 CONVERSÕES

**Temperatura:**
- K = °C + 273,15
- °F = (9/5)°C + 32
- °C = (5/9)(°F - 32)

**Energia:**
- 1 J = 0,239 cal
- 1 cal = 4,184 J
- 1 eV = 1,602×10⁻¹⁹ J
- 1 kWh = 3,6×10⁶ J

**Pressão:**
- 1 atm = 101.325 Pa = 760 mmHg
- 1 bar = 10⁵ Pa

**Velocidade:**
- 1 m/s = 3,6 km/h
- 1 km/h = 0,278 m/s

---

## 📚 FIM

**Total: Mais de 400 fórmulas completas com explicações!**

Use este guia como referência rápida. Sempre verifique unidades antes de calcular!
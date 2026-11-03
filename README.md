# Portfólio · Dra. Tarsila Cantanhede (Médica Veterinária)

Este é o site-portfólio animado da Dra. Tarsila ([@vet.tarsila](https://www.instagram.com/vet.tarsila/)). Ele é estático (HTML, CSS e JavaScript puro): basta abrir o `index.html`. Por enquanto fica **só no computador**, sem publicação.

## O que tem no site
- **Tela de carregamento** com patinhas.
- **Banner com cachorrinho interativo**, desenhado em SVG e original. Ao receber carinho (mouse ou dedo), ele fecha os olhos, cora, abana o rabo, mostra a língua e solta corações e patinhas. Tem contador de carinhos, um "Au au!" de vez em quando e frases no balão.
- **Seções:** Sobre, Atendimentos (consultas, vacinação, exames e por que em casa), Como funciona, Onde atendo (mapa ilustrado), Pacientes (galeria), Dúvidas e Contato.
- **Formulário de agendamento**, que monta a mensagem e abre o WhatsApp dela.
- **Animações ao rolar a página**, com blobs que mudam de forma e o botão de WhatsApp em formato de patinha.

## Como colocar as fotos reais (sem mexer no código)
Salve as fotos em `img/fotos/` com **exatamente estes nomes**:

| Arquivo | Onde aparece | Formato ideal |
|---|---|---|
| `tarsila.jpg` | Seção "Sobre" (**já colocada**) | Retrato vertical (ex.: 1000×1200) |
| `paciente-1.jpg` … `paciente-6.jpg` | Galeria "Pacientes" | Quadrado (ex.: 800×800) |

Enquanto a foto não existir, o site mostra a ilustração correspondente de `img/ilustracoes/`. Para mudar a legenda "Paciente feliz / foto em breve", edite o `<figcaption>` no `index.html` (por exemplo: "Thor · vacinação").

## Dados usados (03/11/2026)
| Informação | Valor | Fonte |
|---|---|---|
| Nome | Tarsila Cantanhede · Médica Veterinária | Instagram |
| Serviços | Consultas 🩺, Vacinas 💉, Exames 🩸 | Bio do Instagram |
| Área | Atendimentos domiciliares em São Luís, Paço do Lumiar e S.J. de… (cortado) | Bio do Instagram |
| WhatsApp | (98) 98608-3965, com a mensagem "Olá! Tenho interesse no seu serviço médico veterinário." | Folder de serviços e link do WhatsApp na bio |
| CRMV | CRMV/MA 3384 | Folder de serviços |
| Serviços | Consulta petfriendly no conforto do seu lar; coleta de exames laboratoriais; vacinação e vermifugação; administração de medicamentos; curativos; aferição de pressão arterial com doppler; aferição de glicemia; emissão de atestado de saúde para viagens | Folder de serviços |
| Foto e logo | `img/fotos/tarsila.jpg` (foto enviada, convertida de `img/ilustracoes/tarsila.PNG`) e `img/logo.png` (recortado do folder) | Enviados pelo Vinícius |

## Confirmar com a Tarsila
- Se a cidade cortada na bio é **São José de Ribamar** (o site já usa esse nome).
- Formação, se ela quiser exibir em "Sobre".
- Espécies que atende (o formulário oferece Cachorro, Gato e Outro) e horários.
- Fotos dos pacientes para a galeria, com autorização dos tutores.
- O logo foi recortado de uma imagem do folder. Se ela tiver o arquivo original (PNG ou SVG), substitua `img/logo.png` para ficar mais nítido.

## Arquivos
- `index.html`: a página inteira, incluindo o SVG do cachorro.
- `css/style.css`: paleta (rosa `#E0679A`, rosa claro `#F7C6D9`, lilás `#B9A2E6`, ameixa `#4A2C4F`), layout e componentes.
- `css/animacoes.css`: tela de carregamento, cachorro, corações, revelação ao rolar e pinos do mapa.
- `js/cachorro.js`: interação de carinho.
- `js/animacoes.js`: menu, patinhas subindo, parallax dos blobs e revelação ao rolar.
- `js/whatsapp-form.js`: formulário de agendamento.
- `js/fotos.js`: troca as fotos que faltam pelas ilustrações.

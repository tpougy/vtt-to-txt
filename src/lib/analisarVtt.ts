export interface LinhaTranscricao {
  horario: string;
  falante: string;
  texto: string;
}

const REGEX_TIMESTAMP =
  /^(\d{2}:\d{2}:\d{2})\.\d{3}\s*-->\s*(\d{2}:\d{2}:\d{2})\.\d{3}/;

const REGEX_FALANTE = /<v\s+([^>]+)>/;

const REGEX_TAGS_HTML = /<[^>]+>/g;

const REGEX_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\/\d+-\d+)?$/i;

function extrairFalanteETexto(
  linha: string
): { falante: string; texto: string } {
  const matchFalante = linha.match(REGEX_FALANTE);

  const falante = matchFalante
    ? matchFalante[1].trim()
    : '';

  const texto = linha
    .replace(REGEX_TAGS_HTML, '')
    .trim();

  return { falante, texto };
}

function ehLinhaIgnorada(linha: string): boolean {
  const aparada = linha.trim();

  return (
    aparada === '' ||
    aparada === 'WEBVTT' ||
    REGEX_UUID.test(aparada)
  );
}

export function analisarVtt(conteudo: string): string {
  const linhas = conteudo.split('\n');

  const resultados: LinhaTranscricao[] = [];

  let horarioAtual = '';
  let blocoTexto: string[] = [];

  function salvarBloco(): void {
    if (!horarioAtual || blocoTexto.length === 0) {
      return;
    }

    const textoCompleto = blocoTexto.join(' ');

    const { falante, texto } =
      extrairFalanteETexto(textoCompleto);

    if (texto) {
      resultados.push({
        horario: horarioAtual,
        falante,
        texto
      });
    }

    blocoTexto = [];
  }

  for (const linha of linhas) {
    const aparada = linha.trim();

    if (ehLinhaIgnorada(aparada)) {
      continue;
    }

    const matchTimestamp =
      aparada.match(REGEX_TIMESTAMP);

    if (matchTimestamp) {
      salvarBloco();

      horarioAtual = matchTimestamp[1];

      continue;
    }

    if (horarioAtual) {
      blocoTexto.push(aparada);
    }
  }

  salvarBloco();

  return resultados
    .map(({ horario, falante, texto }) =>
      falante
        ? `${horario} ${falante}: ${texto}`
        : `${horario} ${texto}`
    )
    .join('\n');
}
<script lang="ts">
  interface Props {
    conteudo: string;
    nomeArquivo: string;
    aoAlterarNome: (valor: string) => void;
    aoReiniciar: () => void;
  }

  const {
    conteudo,
    nomeArquivo,
    aoAlterarNome,
    aoReiniciar
  }: Props = $props();

  let copiado = $state(false);

  async function copiar(): Promise<void> {
    await navigator.clipboard.writeText(conteudo);
    copiado = true;
    setTimeout(() => { copiado = false; }, 2000);
  }

  function baixar(): void {
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-1">
    <label class="text-sm font-medium text-gray-600">
      Nome do arquivo
    </label>

    <div class="flex items-center rounded-lg border border-gray-300 overflow-hidden">
      <input
        type="text"
        value={nomeArquivo.replace(/\.txt$/i, '')}
        oninput={(e) =>
          aoAlterarNome(
            `${(e.target as HTMLInputElement).value}.txt`
          )
        }
        class="flex-1 px-3 py-2 outline-none"
      />

      <span class="px-3 py-2 bg-gray-100 text-gray-500 text-sm border-l">
        .txt
      </span>
    </div>
  </div>
  <div class="flex items-center justify-between gap-3 flex-wrap">
    <h2 class="text-gray-700 font-semibold text-lg">Resultado</h2>
    <div class="flex gap-2">
      <button
        onclick={copiar}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors
          {copiado ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        {copiado ? 'Copiado!' : 'Copiar'}
      </button>
      <button
        onclick={baixar}
        class="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Baixar
      </button>
      <button
        onclick={aoReiniciar}
        class="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
      >
        Reiniciar
      </button>
    </div>
  </div>

  <pre
    class="bg-gray-50 border border-gray-200 rounded-xl p-5 overflow-auto max-h-[60vh]
      font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed"
  >{conteudo}</pre>
</div>

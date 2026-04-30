<script lang="ts">
  import AreaArrastar from './AreaArrastar.svelte';
  import SaidaTexto from './SaidaTexto.svelte';
  import { analisarVtt } from '../lib/analisarVtt';

  type Estado = 'aguardando' | 'convertido';

  let estado = $state<Estado>('aguardando');
  let arquivoAtual = $state<File | null>(null);
  let textoConvertido = $state('');
  let convertendo = $state(false);

  function aoCarregarArquivo(arquivo: File): void {
    arquivoAtual = arquivo;
    estado = 'aguardando';
    textoConvertido = '';
  }

  async function converter(): Promise<void> {
    if (!arquivoAtual) return;
    convertendo = true;
    const conteudo = await arquivoAtual.text();
    textoConvertido = analisarVtt(conteudo);
    estado = 'convertido';
    convertendo = false;
  }

  function reiniciar(): void {
    arquivoAtual = null;
    textoConvertido = '';
    estado = 'aguardando';
  }
</script>

<div class="flex flex-col gap-6">
  {#if estado === 'aguardando'}
    <AreaArrastar aoCarregar={aoCarregarArquivo} />

    <button
      onclick={converter}
      disabled={!arquivoAtual || convertendo}
      class="w-full py-3 rounded-xl font-semibold text-white transition-colors
        {!arquivoAtual || convertendo
          ? 'bg-blue-300 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'}"
    >
      {convertendo ? 'Convertendo...' : 'Converter'}
    </button>
  {:else}
    <SaidaTexto conteudo={textoConvertido} aoReiniciar={reiniciar} />
  {/if}
</div>

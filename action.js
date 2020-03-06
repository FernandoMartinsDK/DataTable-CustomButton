$(document).ready(function () {
    var tabela;

    $('#bntPessoa').on('click', function () {

        $.ajax({
            method: "POST",
            url: "busca.php",
            data: { tabela: 'pessoa' }
        }).done(function (msg) {
            obj = JSON.parse(msg);

            var dataSet = [];

            for (let i = 0; i < obj.length; i++) {
                dataSet[i] = [obj[i]['id'], obj[i]['nome'], obj[i]['idade'], obj[i]['funcao'], obj[i]['salario']];
            }

            tabela = $('#tabela').DataTable({
                responsive: true,
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
                data: dataSet,
                columnDefs: [ //defini manualmente o tamanho da coluna
                    { "width": "20%", "targets": 0 }, //força a primeira coluna a usar 20%. 
                    { "width": "20%", "targets": 1 },
                    { "width": "20%", "targets": 2 },
                    { "width": "20%", "targets": 3 },
                    { "width": "20%", "targets": 4 }
                ],
                columns: [
                    { title: "Id" },
                    { title: "Nome" },
                    { title: "Idade" },
                    { title: "Função" },
                    { title: "Salario" }
                ],
                dom: 'Bfrtip',        // element order: NEEDS BUTTON CONTAINER (B) ****
                select: 'single',     // enable single row selection
                altEditor: true,
                buttons: [{
                    text: 'Adicionar',
                    action: function () {
                        tabela.row.add([
                            '111',
                            'fulano de tal ',
                            '56',
                            'vendedor',
                            '1200'
                        ]).draw(false);
                    }
                },
                {
                    extend: 'selected', // Bind to Selected row
                    text: 'Editar',
                    action: function () {
                        $.map(tabela.rows('.selected').data(), function (item) {

                            //alert(item[1])
                            var resposta = prompt("Please enter your name:", item[1]);

                            tabela.rows({ selected: true }).every(function (rowIdx, tableLoop, rowLoop) {
                                tabela.cell(rowIdx, 1).data(resposta);
                            }).draw();

                        });
                    }
                },
                {
                    extend: 'selected', // Bind to Selected row
                    text: 'Deletar',
                    action: function () {
                        tabela.row('.selected').remove().draw(false);
                    }
                }
                ],
            });
        })
    });



});



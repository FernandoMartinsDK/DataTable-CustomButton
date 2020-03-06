<?php
    
    class bdlocal{
        public function conecta_mysql(){
          //cria conexão
          $con = new PDO('mysql:host=localhost;dbname=meubd', 'administrador', '346580'); 
          //verifica se houve erro de conexão
          if(mysqli_connect_errno()){
            echo 'Erro ao tentar se conectar com o BD MySQL: '.mysqli_connect_error();
          }
          return $con;
        }
      }
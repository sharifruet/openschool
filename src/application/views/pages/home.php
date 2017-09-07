        <!-- Page Heading -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">OpenSchool Items
                    <small>Choose an item</small>
                </h1>
            </div>
        </div>
        <!-- /.row -->

        <!-- Projects Row -->
        <div class="row">
        	
        <?php foreach ($menu as $m):?>
            <div class="col-md-4 portfolio-item">
                <a href="#">
                	<!--  <img class="img-responsive" src="http://placehold.it/750x450" alt="" />-->
                    <?php echo $m['displayName'] ?>
                </a>
            </div>
         <?php endforeach; ?>

        </div>
        <!-- /.row -->

        

        <hr>
		
        <!-- Pagination -->
        <!--
        <div class="row text-center">
            <div class="col-lg-12">
                <ul class="pagination">
                    <li>
                        <a href="#">&laquo;</a>
                    </li>
                    <li class="active">
                        <a href="#">1</a>
                    </li>
                    <li>
                        <a href="#">2</a>
                    </li>
                    <li>
                        <a href="#">3</a>
                    </li>
                    <li>
                        <a href="#">4</a>
                    </li>
                    <li>
                        <a href="#">5</a>
                    </li>
                    <li>
                        <a href="#">&raquo;</a>
                    </li>
                </ul>
            </div>
        </div>
          -->
        <!-- /.row -->

        <hr>

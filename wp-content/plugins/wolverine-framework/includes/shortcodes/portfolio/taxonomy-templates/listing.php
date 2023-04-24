<?php
$primary_color = g5plus_framework_get_option('primary_color','#995958');
$terms = get_terms(
    G5PLUS_PORTFOLIO_CATEGORY_TAXONOMY,
    array(
        'include' => explode(",",$portfolio_taxonomy_ids),
        'hide_empty' => 0,
        'orderby' => 'ASC')
);

$col_class = '';
$col_class = 'wolverine-col-md-' . $column;
$data_section_id = uniqid();

?>
<div
    class="portfolio overflow-hidden <?php echo esc_attr($g5plus_animation . ' ' . $styles_animation) ?>"
    id="portfolio-<?php echo esc_attr($data_section_id) ?>">
    <div
        class="portfolio-wrapper <?php echo sprintf('%s %s %s', $col_class, $padding, $layout_type) ?>"
        data-section-id="<?php echo esc_attr($data_section_id) ?>"
        id="portfolio-container-<?php echo esc_attr($data_section_id) ?>"
        data-columns="<?php echo esc_attr($column) ?>">
        <?php
        $index = 0;
        foreach ( $terms as $term ) {
            $index++;
            include(plugin_dir_path(__FILE__) . '/loop/' . $layout_type . '-item.php');
        }
        ?>

    </div>
</div>

<script type="text/javascript">
    (function ($) {
        "use strict";
        $(document).ready(function () {
            <?php if (g5framework_is_enable_hover_dir($overlay_style)) {?>
            $('.portfolio-item.hover-dir > div.entry-thumbnail').hoverdir();
            <?php } ?>
        })
    })(jQuery);
</script>



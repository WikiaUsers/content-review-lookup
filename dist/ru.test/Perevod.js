select msi.segment1,
       msi.primary_uom_code,
       'кг' as second_uom,
       inv_convert.inv_um_convert(msi.inventory_item_id,'кг',
                                  msi.primary_uom_code) as coefficient
from mtl_system_items_b msi
where msi.primary_uom_code = 'Фунт'
and rownum <= 2.205